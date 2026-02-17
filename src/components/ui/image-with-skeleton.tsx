'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageWithSkeletonProps extends ImageProps {
    containerClassName?: string;
    skeletonClassName?: string;
}

export function ImageWithSkeleton({
    className,
    containerClassName,
    skeletonClassName,
    alt,
    ...props
}: ImageWithSkeletonProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={cn("relative overflow-hidden", containerClassName)}>
            {isLoading && (
                <Skeleton
                    className={cn(
                        "absolute inset-0 z-10 w-full h-full bg-muted/50 animate-pulse",
                        skeletonClassName
                    )}
                />
            )}
            <Image
                className={cn(
                    "duration-700 ease-in-out",
                    isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
                    className
                )}
                onLoad={() => setIsLoading(false)}
                alt={alt}
                {...props}
            />
        </div>
    );
}
