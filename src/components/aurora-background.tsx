'use client';

import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class merging

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    showRadialGradient?: boolean;
}

export const AuroraBackground = ({
    className,
    showRadialGradient = true,
    children,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <div
            className={cn(
                'relative flex flex-col h-[100vh] items-center justify-center bg-transparent text-slate-950 transition-bg',
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className={cn(
                        // Base blobs
                        `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,#EC7FA9_10%,#ca668f_15%,#a84e75_20%,#e89ab9_25%,#fce7f3_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[''] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform [transform:translate3d(0,0,0)] [backface-visibility:hidden]
            `,
                        showRadialGradient &&
                        `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
                    )}
                ></div>
                {/* Noise Overlay - Optimized opacity */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay will-change-transform [transform:translate3d(0,0,0)]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
                </div>

                {/* Subtle Grid Overlay - Optimized */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808016_1px,transparent_1px),linear-gradient(to_bottom,#80808016_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none will-change-transform [transform:translate3d(0,0,0)]"></div>
            </div>
            {children}
        </div>
    );
};
