'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
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

const Particles: React.FC<ParticlesProps> = ({
    className = '',
    quantity = 45, // Balanced: richer than 30, still fast without connection lines
    staticity = 50,
    ease = 50,
    size = 0.4,
    refresh = false,
    color = '#EC7FA9',
    vx = 0,
    vy = 0,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const circles = useRef<Circle[]>([]);
    const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
    const animationFrameId = useRef<number>(0);
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1; // Cap DPR at 2
    const { resolvedTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined);

    useEffect(() => {
        setCurrentTheme(resolvedTheme);
    }, [resolvedTheme]);

    const particleColor = currentTheme === 'dark' ? '#EC7FA9' : '#000000';

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

    const resizeCanvas = useCallback(() => {
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
    }, [dpr]);

    const circleParams = useCallback((): Circle => {
        const x = Math.floor(Math.random() * canvasSize.current.w);
        const y = Math.floor(Math.random() * canvasSize.current.h);
        const pSize = Math.floor(Math.random() * 2) + size;
        const alpha = 0;
        const targetAlpha = parseFloat((Math.random() * 0.5 + 0.5).toFixed(1));
        const dx = (Math.random() - 0.5) * 0.15; // Slower
        const dy = (Math.random() - 0.5) * 0.15;
        const magnetism = 0.1 + Math.random() * 4;
        return { x, y, translateX: 0, translateY: 0, size: pSize, alpha, targetAlpha, dx, dy, magnetism };
    }, [size]);

    useEffect(() => {
        if (canvasRef.current) {
            context.current = canvasRef.current.getContext('2d');
        }
        resizeCanvas();

        // Draw initial particles
        const particleCount = quantity;
        for (let i = 0; i < particleCount; i++) {
            circles.current.push(circleParams());
        }

        // Animate - NO connection lines (O(n) instead of O(n²))
        const animate = () => {
            if (!context.current) return;
            context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);

            const isBlack = particleColor === '#000000';

            circles.current.forEach((circle) => {
                // Alpha fade
                const edge = [
                    circle.x + circle.translateX - circle.size,
                    canvasSize.current.w - circle.x - circle.translateX - circle.size,
                    circle.y + circle.translateY - circle.size,
                    canvasSize.current.h - circle.y - circle.translateY - circle.size,
                ];
                const closestEdge = Math.min(...edge);
                const remapClosestEdge = Math.min(1, Math.max(0, closestEdge / 20));

                if (remapClosestEdge > 1) {
                    circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha);
                } else {
                    circle.alpha = circle.targetAlpha * remapClosestEdge;
                }

                circle.x += circle.dx + vx;
                circle.y += circle.dy + vy;
                circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
                circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

                // Wrap
                if (circle.x < -circle.size) circle.x = canvasSize.current.w + circle.size;
                else if (circle.x > canvasSize.current.w + circle.size) circle.x = -circle.size;
                if (circle.y < -circle.size) circle.y = canvasSize.current.h + circle.size;
                else if (circle.y > canvasSize.current.h + circle.size) circle.y = -circle.size;

                // Draw
                context.current!.translate(circle.translateX, circle.translateY);
                context.current!.beginPath();
                context.current!.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
                context.current!.fillStyle = isBlack
                    ? `rgba(0, 0, 0, ${circle.alpha})`
                    : `rgba(236, 127, 169, ${circle.alpha})`;
                context.current!.fill();
                context.current!.setTransform(dpr, 0, 0, dpr, 0, 0);
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animationFrameId.current = requestAnimationFrame(animate);

        const handleResize = () => {
            resizeCanvas();
            circles.current = [];
            for (let i = 0; i < quantity; i++) {
                circles.current.push(circleParams());
            }
        };
        window.addEventListener('resize', handleResize);

        const handleMouseMove = (event: MouseEvent) => {
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const { w, h } = canvasSize.current;
                const mx = event.clientX - rect.left - w / 2;
                const my = event.clientY - rect.top - h / 2;
                if (mx < w / 2 && mx > -w / 2 && my < h / 2 && my > -h / 2) {
                    mouse.current.x = mx;
                    mouse.current.y = my;
                }
            }
        };
        canvasRef.current?.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener('resize', handleResize);
        };
    }, [particleColor, refresh, quantity, circleParams, resizeCanvas, dpr, ease, staticity, vx, vy]);

    return (
        <div className={className} ref={canvasContainerRef} aria-hidden="true">
            <canvas ref={canvasRef} className="h-full w-full" />
        </div>
    );
};

export default Particles;
