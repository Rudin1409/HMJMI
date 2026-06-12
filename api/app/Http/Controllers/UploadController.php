<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->file('image')) {
            // Store optimized image in public/uploads directory
            $path = \App\Helpers\ImageOptimizer::optimizeAndSave($request->file('image'), 'uploads');
            $url = asset('storage/' . $path);

            return response([
                'url' => $url
            ], 200);
        }

        return response([
            'message' => 'Gagal mengunggah gambar.'
        ], 400);
    }
}
