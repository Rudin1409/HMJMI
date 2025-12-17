'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { incrementPostLikes } from '@/services/analytics';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface LikeButtonProps {
    postId: string;
    initialLikes?: number;
}

export function LikeButton({ postId, initialLikes = 0 }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        // Sync with initialLikes if it changes (e.g. realtime update from parent)
        setLikes(initialLikes);
    }, [initialLikes]);

    useEffect(() => {
        // Check local storage
        const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
        if (likedPosts.includes(postId)) {
            setIsLiked(true);
        }
    }, [postId]);

    const handleLike = async () => {
        if (isLiked || isLoading) {
            if (isLiked) {
                toast({
                    description: "Anda sudah menyukai postingan ini.",
                });
            }
            return;
        }

        setIsLoading(true);

        // Optimistic update
        setLikes(prev => prev + 1);
        setIsLiked(true);

        try {
            // Save to local storage
            const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
            likedPosts.push(postId);
            localStorage.setItem('liked_posts', JSON.stringify(likedPosts));

            // Call server
            await incrementPostLikes(postId);

            toast({
                description: "Terima kasih atas apresiasi Anda! ❤️",
            });
        } catch (error) {
            // Revert on error
            setLikes(prev => prev - 1);
            setIsLiked(false);
            console.error("Failed to like:", error);
            toast({
                variant: 'destructive',
                description: "Gagal mengirim like. Coba lagi.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleLike}
            className={cn(
                "gap-2 transition-all duration-300",
                isLiked ? "border-red-500 text-red-500 bg-red-50 dark:bg-red-950/20" : "hover:text-red-500 hover:border-red-500"
            )}
        >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
            <span>{likes > 0 ? likes : 'Suka'}</span>
        </Button>
    );
}
