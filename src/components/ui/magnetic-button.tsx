'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    startColor?: string;
    endColor?: string;
}

export const MagneticButton = ({
    children,
    className,
    startColor = '#ec4899', // Pink
    endColor = '#8b5cf6', // Violet
    ...props
}: MagneticButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: x * 0.2, y: y * 0.2 }} // Magnetic pull strength
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            className={cn(
                "relative px-8 py-3 rounded-full text-white font-bold text-lg overflow-hidden group transition-transform active:scale-95 shadow-lg hover:shadow-xl",
                className
            )}
            style={{
                background: `linear-gradient(135deg, ${startColor}, ${endColor})`,
            }}
            {...props as any} // Cast props to fix motion.button type mismatch
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>

            {/* Hover Glow Effect */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)`
                }}
            />
        </motion.button>
    );
};
