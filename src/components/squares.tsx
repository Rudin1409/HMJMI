'use client';
import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Squares = ({
  direction = "diagonal",
  speed = 0.5,
  squareSize = 40,
  defaultBorderColor = "hsla(331, 69%, 90%, 0.5)",
  hoverFillColor = "hsl(331, 69%, 61%)",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<{ x: number; y: number } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    const gradientColor = resolvedTheme === 'dark' 
      ? 'hsl(331 25% 10%)' 
      : 'hsl(320 100% 98%)';

    const drawGrid = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = - (gridOffset.current.x % squareSize);
      const startY = - (gridOffset.current.y % squareSize);
      
      for (let y = startY; y < canvas.height; y += squareSize) {
          for (let x = startX; x < canvas.width; x += squareSize) {
              
              const isHovered = hoveredSquareRef.current &&
                  Math.floor((hoveredSquareRef.current.x - x) / squareSize) === 0 &&
                  Math.floor((hoveredSquareRef.current.y - y) / squareSize) === 0;

              if (isHovered) {
                  ctx.fillStyle = hoverFillColor;
                  ctx.fillRect(x, y, squareSize, squareSize);
              } else {
                 ctx.strokeStyle = defaultBorderColor;
                 ctx.strokeRect(x, y, squareSize, squareSize);
              }
          }
      }

      // Vignette effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      gradient.addColorStop(0.8, gradientColor);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed) % squareSize;
          break;
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed) % squareSize;
          break;
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }
      
      drawGrid();
      animationFrameId = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        hoveredSquareRef.current = { x: mouseX, y: mouseY };
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };
    
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    updateAnimation();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMounted, direction, speed, defaultBorderColor, hoverFillColor, squareSize, resolvedTheme]);

  if (!isMounted) {
    return null; // Don't render canvas on the server
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full border-none block"
    ></canvas>
  );
};

export default Squares;
