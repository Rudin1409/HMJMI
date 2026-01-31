'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface ParticlesProps {
    className?: string;
    quantity?: number;
    staticity?: number;
    ease?: number;
    size?: number;
    refresh?: boolean;
    color?: string;
    vx?: number;
    vy?: number;
}

function hexToRgb(hex: string): number[] {
    hex = hex.replace('#', '');
    const isShort = hex.length === 3;
    const r = parseInt(isShort ? hex[0] + hex[0] : hex.substring(0, 2), 16);
    const g = parseInt(isShort ? hex[1] + hex[1] : hex.substring(2, 4), 16);
    const b = parseInt(isShort ? hex[2] + hex[2] : hex.substring(4, 6), 16);
    return [r, g, b];
}

const Particles: React.FC<ParticlesProps> = ({
    className = '',
    quantity = 80, // Jumlah partikel default
    staticity = 50,
    ease = 50,
    size = 0.4,
    refresh = false,
    color = '#EC7FA9', // Default primary color from globals.css
    vx = 0,
    vy = 0,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const circles = useRef<any[]>([]);
    const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    const { resolvedTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined);

    // Set theme initialization
    useEffect(() => {
        setCurrentTheme(resolvedTheme);
    }, [resolvedTheme]);

    // Determine efficient color based on theme
    const particleColor = currentTheme === 'dark' ? '#EC7FA9' : '#000000'; // Pink in dark, Black in light

    useEffect(() => {
        if (canvasRef.current) {
            context.current = canvasRef.current.getContext('2d');
        }
        initCanvas();
        animate();
        window.addEventListener('resize', initCanvas);

        return () => {
            window.removeEventListener('resize', initCanvas);
        };
    }, [particleColor, refresh]); // Re-init when color/theme changes

    useEffect(() => {
        onMouseMove();
    }, []);

    const initCanvas = () => {
        resizeCanvas();
        drawParticles();
    };

    const onMouseMove = () => {
        if (canvasRef.current) {
            canvasRef.current.addEventListener('mousemove', (event) => {
                if (canvasRef.current) {
                    const rect = canvasRef.current.getBoundingClientRect();
                    const { w, h } = canvasSize.current;
                    const x = event.clientX - rect.left - w / 2;
                    const y = event.clientY - rect.top - h / 2;
                    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
                    if (inside) {
                        mouse.current.x = x;
                        mouse.current.y = y;
                    }
                }
            });
        }
    };

    type Circle = {
        x: number;
        y: number;
        translateX: number;
        translateY: number;
        size: number;
        alpha: number;
        targetAlpha: number;
        dx: number;
        dy: number;
        magnetism: number;
    };

    const resizeCanvas = () => {
        if (canvasContainerRef.current && canvasRef.current && context.current) {
            circles.current.length = 0;
            canvasSize.current.w = canvasContainerRef.current.offsetWidth;
            canvasSize.current.h = canvasContainerRef.current.offsetHeight;
            canvasRef.current.width = canvasSize.current.w * dpr;
            canvasRef.current.height = canvasSize.current.h * dpr;
            canvasRef.current.style.width = `${canvasSize.current.w}px`;
            canvasRef.current.style.height = `${canvasSize.current.h}px`;
            context.current.scale(dpr, dpr);
        }
    };

    const circleParams = (): Circle => {
        const x = Math.floor(Math.random() * canvasSize.current.w);
        const y = Math.floor(Math.random() * canvasSize.current.h);
        const translateX = 0;
        const translateY = 0;
        const pSize = Math.floor(Math.random() * 2) + size;
        const alpha = 0;
        const targetAlpha = parseFloat((Math.random() * 0.5 + 0.5).toFixed(1)); // Min 0.5, Max 1.0
        const dx = (Math.random() - 0.5) * 0.2; // Slow speed
        const dy = (Math.random() - 0.5) * 0.2; // Slow speed
        const magnetism = 0.1 + Math.random() * 4;
        return {
            x,
            y,
            translateX,
            translateY,
            size: pSize,
            alpha,
            targetAlpha,
            dx,
            dy,
            magnetism,
        };
    };

    const drawCircle = (circle: Circle, update = false) => {
        if (context.current) {
            const { x, y, translateX, translateY, size, alpha } = circle;
            context.current.translate(translateX, translateY);
            context.current.beginPath();
            context.current.arc(x, y, size, 0, 2 * Math.PI);
            context.current.fillStyle = particleColor === '#000000'
                ? `rgba(0, 0, 0, ${alpha})`
                : `rgba(236, 127, 169, ${alpha})`; // hexToRgb manual implementation for performance
            context.current.fill();
            context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (!update) {
                circles.current.push(circle);
            }
        }
    };

    const clearContext = () => {
        if (context.current) {
            context.current.clearRect(
                0,
                0,
                canvasSize.current.w,
                canvasSize.current.h,
            );
        }
    };

    const drawParticles = () => {
        clearContext();
        const particleCount = quantity;
        for (let i = 0; i < particleCount; i++) {
            const circle = circleParams();
            drawCircle(circle);
        }
    };

    const remapValue = (
        value: number,
        start1: number,
        end1: number,
        start2: number,
        end2: number,
    ): number => {
        return ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    };

    const animate = () => {
        clearContext();
        circles.current.forEach((circle: Circle, i: number) => {
            // Handle the alpha value
            const edge = [
                circle.x + circle.translateX - circle.size, // distance from left edge
                canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
                circle.y + circle.translateY - circle.size, // distance from top edge
                canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
            ];
            const closestEdge = edge.reduce((a, b) => Math.min(a, b));
            const remapClosestEdge = parseFloat(
                remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
            );
            if (remapClosestEdge > 1) {
                circle.alpha += 0.02;
                if (circle.alpha > circle.targetAlpha) {
                    circle.alpha = circle.targetAlpha;
                }
            } else {
                circle.alpha = circle.targetAlpha * remapClosestEdge;
            }

            circle.x += circle.dx + vx;
            circle.y += circle.dy + vy;
            circle.translateX +=
                (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
                ease;
            circle.translateY +=
                (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
                ease;

            // Wrap around screen
            if (circle.x < -circle.size) circle.x = canvasSize.current.w + circle.size;
            else if (circle.x > canvasSize.current.w + circle.size) circle.x = -circle.size;

            if (circle.y < -circle.size) circle.y = canvasSize.current.h + circle.size;
            else if (circle.y > canvasSize.current.h + circle.size) circle.y = -circle.size;

            drawCircle(circle, true);

            // Connect particles
            for (let j = i + 1; j < circles.current.length; j++) {
                const circle2 = circles.current[j];
                const dx = circle.x - circle2.x;
                const dy = circle.y - circle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 140) { // Connection threshold increased
                    if (context.current) {
                        context.current.beginPath();
                        const opacity = (1 - distance / 140) * 0.6; // fade line with distance, increased base opacity
                        context.current.strokeStyle = particleColor === '#000000'
                            ? `rgba(0, 0, 0, ${opacity})`
                            : `rgba(236, 127, 169, ${opacity})`;
                        context.current.lineWidth = 0.6; // Slightly thicker lines
                        context.current.moveTo(circle.x + circle.translateX, circle.y + circle.translateY);
                        context.current.lineTo(circle2.x + circle2.translateX, circle2.y + circle2.translateY);
                        context.current.stroke();
                    }
                }
            }
        });
        window.requestAnimationFrame(animate);
    };

    return (
        <div className={className} ref={canvasContainerRef} aria-hidden="true">
            <canvas ref={canvasRef} className="h-full w-full" />
        </div>
    );
};

export default Particles;
