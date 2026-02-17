'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PremiumBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    showRadialGradient?: boolean;
}

export const PremiumBackground = ({
    className,
    showRadialGradient = true,
    children,
    ...props
}: PremiumBackgroundProps) => {
    return (
        <div
            className={cn(
                'relative flex flex-col h-[100vh] items-center justify-center bg-transparent text-slate-950 transition-bg',
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 overflow-hidden">
                {/* Base Background */}
                <div className="absolute inset-0 bg-white dark:bg-[#020617]" />

                {/* Dot Grid - Light Mode - Enhanced Visibility */}
                <div
                    className="absolute inset-0 pointer-events-none dark:hidden"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #94a3b8 1.5px, transparent 1.5px)', // Slightly larger & darker
                        backgroundSize: '24px 24px',
                        maskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)', // Extended mask
                        WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
                        opacity: 0.6,
                    }}
                />
                {/* Dot Grid - Dark Mode - Enhanced Visibility */}
                <div
                    className="absolute inset-0 pointer-events-none hidden dark:block"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #4b5563 1.5px, transparent 1.5px)', // Slightly larger
                        backgroundSize: '24px 24px',
                        maskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)', // Extended mask
                        WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
                        opacity: 0.45,
                    }}
                />

                {/* Floating Shapes - Animated & Lightweight - Enhanced Visibility */}
                <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob dark:bg-purple-500/25 dark:mix-blend-screen dark:opacity-40" />
                <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 dark:bg-indigo-500/25 dark:mix-blend-screen dark:opacity-40" />
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 dark:bg-pink-500/25 dark:mix-blend-screen dark:opacity-40" />

                {/* Geo Shapes - BOLD VISIBILITY */}
                <div className="absolute top-1/4 right-10 w-32 h-32 border-2 border-indigo-200/50 rounded-3xl rotate-45 animate-float opacity-60 dark:border-white/20 dark:opacity-60 backdrop-blur-[1px]" />
                <div className="absolute bottom-1/3 left-10 w-40 h-40 bg-indigo-500/10 rounded-3xl -rotate-12 animate-float animation-delay-4000 opacity-20 backdrop-blur-sm dark:bg-indigo-400/10 dark:opacity-50" />

                {/* Tech Particles - Scattered & Dynamic - SCALED UP & RICHER */}
                <div className="absolute top-20 left-20 w-8 h-8 border-2 border-purple-400/50 rounded-full opacity-60 animate-float animation-delay-1000 dark:border-white/40 dark:opacity-20 backdrop-blur-[1px]" />
                <div className="absolute top-40 right-40 w-6 h-6 bg-purple-500/40 rotate-45 opacity-60 animate-float animation-delay-2000 dark:bg-purple-400/40 dark:opacity-20 blur-[1px]" />
                <div className="absolute bottom-20 right-20 w-10 h-10 border-2 border-indigo-400/50 rotate-12 opacity-60 animate-float animation-delay-3000 dark:border-indigo-400/40 dark:opacity-20 backdrop-blur-[1px]" />
                <div className="absolute bottom-40 left-10 w-6 h-6 bg-pink-500/30 rounded-full opacity-60 animate-float animation-delay-500 dark:bg-pink-400/40 dark:opacity-20 blur-[1px]" />
                <div className="absolute top-1/2 left-1/4 w-8 h-8 border-2 border-yellow-500/50 rotate-45 opacity-60 animate-float animation-delay-1500 dark:border-yellow-400/40 dark:opacity-20 backdrop-blur-[1px]" />
                <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-cyan-500/30 rounded-md opacity-60 animate-float animation-delay-2500 dark:bg-cyan-400/40 dark:opacity-20 blur-[1px]" />
                <div className="absolute bottom-10 left-1/2 w-8 h-8 border-2 border-rose-400/50 rounded-full opacity-50 animate-float animation-delay-3500 dark:border-white/30 dark:opacity-10 backdrop-blur-[1px]" />
                <div className="absolute top-10 right-10 w-12 h-12 border-2 border-fuchsia-300/50 rounded-xl rotate-12 opacity-50 animate-float animation-delay-4500 dark:border-white/20 dark:opacity-10 backdrop-blur-[2px]" />
            </div>
            {children}
        </div>
    );
};
