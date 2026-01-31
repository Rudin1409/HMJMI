'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export function AnimatedLogo() {
  const ref = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ x: number; y: number; duration: number; delay: number; left: number }[]>([]);

  useEffect(() => {
    setParticles(
      [...Array(15)].map(() => ({
        x: (Math.random() - 0.5) * 60, // Wider spread
        y: -120 - Math.random() * 80, // Higher rise
        duration: 1.5 + Math.random() * 2, // Faster fire movement
        delay: Math.random() * 2,
        left: 50 + (Math.random() - 0.5) * 20, // Start from center
      }))
    );
  }, []);

  // Parallax Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative flex items-center justify-center w-full aspect-square perspective-1000 cursor-pointer"
    >
      {/* Radiant Aura Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)] opacity-20 blur-3xl rounded-full animate-pulse z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_60%)] opacity-10 blur-2xl rounded-full z-0 transform rotate-45" />

      {/* Orbit 1: Large Slow Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[90%] h-[90%] border border-dashed border-primary/40 rounded-full z-10"
      >
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary blur-md rounded-full opacity-60 animate-pulse"></div>
          <div className="relative w-4 h-4 bg-white rounded-full shadow-[0_0_15px_var(--primary)] text-xs flex items-center justify-center"></div>
        </motion.div>
      </motion.div>

      {/* Orbit 2: Tilted Gyro Ring */}
      <motion.div
        animate={{ rotate: 360, rotateX: 60, rotateY: 45 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] border border-blue-500/30 rounded-full z-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div className="absolute bottom-0 right-1/4 w-6 h-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-500 blur-md rounded-full opacity-60"></div>
          <div className="relative w-3 h-3 bg-white rounded-full shadow-[0_0_15px_#3b82f6]"></div>
        </motion.div>
      </motion.div>

      {/* Orbit 3: Reverse Tilted Gyro Ring */}
      <motion.div
        animate={{ rotate: -360, rotateX: -60, rotateY: -45 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[70%] h-[70%] border border-dashed border-yellow-500/30 rounded-full z-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div className="absolute top-1/4 left-0 w-5 h-5 flex items-center justify-center">
          <div className="absolute inset-0 bg-yellow-500 blur-md rounded-full opacity-60"></div>
          <div className="relative w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_15px_#eab308]"></div>
        </motion.div>
      </motion.div>

      {/* Floating Particles (Sparks/Embers) */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0, 0],
            y: p.y,
            x: p.x,
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut"
          }}
          className="absolute w-1.5 h-1.5 bg-gradient-to-t from-orange-500 via-red-500 to-yellow-400 rounded-full blur-[1px] z-20 shadow-[0_0_10px_#facc15]"
          style={{
            left: `${p.left}%`,
            top: '60%'
          }}
        />
      ))}


      {/* Central Logo Container */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[50%] h-[50%] flex items-center justify-center z-30 group"
        style={{ transformStyle: "preserve-3d", translateZ: "40px" }}
      >
        {/* Central Glow - Replaces opacity container */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-blue-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

        <Image
          src="/logo/logokabinet.png"
          width={500}
          height={500}
          alt="Logo Kabinet Karsadhikara"
          data-ai-hint="phoenix emblem"
          className="drop-shadow-[0_0_50px_rgba(236,127,169,0.5)] object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
        />
      </motion.div>
    </motion.div>
  );
}
