'use client';

import { cn } from '@/lib/utils';

interface BackgroundBlobsProps {
    className?: string;
}

export function BackgroundBlobs({ className }: BackgroundBlobsProps) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/8 rounded-full opacity-40 dark:opacity-15" style={{ filter: 'blur(60px)' }} />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full opacity-30 dark:opacity-10" style={{ filter: 'blur(60px)' }} />
        </div>
    );
}
