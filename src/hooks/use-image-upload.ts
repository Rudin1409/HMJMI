import { useState } from 'react';

interface UseImageUploadResult {
    uploadImage: (file: File) => Promise<string>;
    isLoading: boolean;
    error: Error | null;
    progress: number;
}

export function useImageUpload(): UseImageUploadResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [progress, setProgress] = useState(0);

    const uploadImage = async (file: File): Promise<string> => {
        setIsLoading(true);
        setError(null);
        setProgress(0);

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            const err = new Error('Cloudinary configuration missing. Please check .env.local');
            console.error(err);
            setError(err);
            setIsLoading(false);
            throw err;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        // Optional: add folder if needed
        // formData.append('folder', 'hmj_posts');

        try {
            const xhr = new XMLHttpRequest();

            const promise = new Promise<string>((resolve, reject) => {
                xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 100;
                        setProgress(Math.round(percentComplete));
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response.secure_url);
                    } else {
                        console.error('Cloudinary upload failed:', xhr.responseText);
                        reject(new Error(`Upload failed with status ${xhr.status}`));
                    }
                };

                xhr.onerror = () => {
                    reject(new Error('Network error during upload'));
                };

                xhr.send(formData);
            });

            const url = await promise;
            return url;
        } catch (err: any) {
            console.error('Upload Error:', err);
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { uploadImage, isLoading, error, progress };
}
