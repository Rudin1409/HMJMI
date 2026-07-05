<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

class ImageOptimizer
{
    /**
     * Resizes and converts an uploaded image to compressed WebP format.
     * Falls back to saving the original file if the GD extension is not loaded.
     *
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $directory
     * @param string|null $filename
     * @return string Stored file path (relative to storage/public)
     */
    public static function optimizeAndSave($file, $directory, $filename = null)
    {
        if (!$filename) {
            $filename = uniqid() . '.webp';
        } else {
            $filename = pathinfo($filename, PATHINFO_FILENAME) . '_' . uniqid() . '.webp';
        }

        // 1. Check if GD is loaded. If not, fallback to Laravel's default store.
        if (!extension_loaded('gd')) {
            return $file->store($directory, 'public');
        }

        // 2. Load the image based on Mime Type
        $mime = $file->getClientMimeType();
        switch ($mime) {
            case 'image/jpeg':
            case 'image/jpg':
                $image = @imagecreatefromjpeg($file->getRealPath());
                break;
            case 'image/png':
                $image = @imagecreatefrompng($file->getRealPath());
                break;
            case 'image/webp':
                $image = @imagecreatefromwebp($file->getRealPath());
                break;
            case 'image/gif':
                $image = @imagecreatefromgif($file->getRealPath());
                break;
            default:
                // Fallback for unsupported mime types
                return $file->store($directory, 'public');
        }

        // If loading failed, fallback
        if (!$image) {
            return $file->store($directory, 'public');
        }

        // Convert palette/indexed images (like GIFs or indexed PNGs) to truecolor
        // to prevent imagewebp() from failing with "Palette image not supported by webp"
        if (!imageistruecolor($image)) {
            imagepalettetotruecolor($image);
        }

        // 3. Get original dimensions
        $width = imagesx($image);
        $height = imagesy($image);

        $maxDimension = 1920; // Increased to 1920px for high quality / Full HD resolution

        // 4. Resize if width or height exceeds maxDimension
        if ($width > $maxDimension || $height > $maxDimension) {
            if ($width > $height) {
                $newWidth = $maxDimension;
                $newHeight = (int) (($height / $width) * $maxDimension);
            } else {
                $newHeight = $maxDimension;
                $newWidth = (int) (($width / $height) * $maxDimension);
            }

            $resizedImage = imagecreatetruecolor($newWidth, $newHeight);
            
            // Preserve transparency for PNG and WebP
            imagealphablending($resizedImage, false);
            imagesavealpha($resizedImage, true);
            
            imagecopyresampled($resizedImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
            $image = $resizedImage;
        } else {
            // Even if not resized, ensure transparency settings are intact for encoding
            imagealphablending($image, false);
            imagesavealpha($image, true);
        }

        // 5. Save as WebP into a temporary file
        $tempPath = tempnam(sys_get_temp_dir(), 'webp_opt_');
        if (imagewebp($image, $tempPath, 90)) { // Increased to 90% quality for very sharp and smooth results
            // Store WebP using Laravel's Storage disk
            Storage::disk('public')->putFileAs($directory, new File($tempPath), $filename);
            @unlink($tempPath);

            return $directory . '/' . $filename;
        }

        // Final fallback if WebP conversion fails
        @unlink($tempPath);
        return $file->store($directory, 'public');
    }
}
