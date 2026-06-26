'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function AnimatedLogo({ logoPath }: { logoPath?: string }) {
  return (
    <div className="relative flex items-center justify-center w-full aspect-square">
      {/* Soft Radial Glow */}
      <div
        className="absolute inset-[10%] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.12) 0%, transparent 65%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Orbit 1 — Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute w-[92%] h-[92%] rounded-full"
        style={{ border: '2px dashed hsl(var(--primary) / 0.25)' }}
      >
        {/* Pink rounded square */}
        <div className="absolute top-0 left-[30%] -translate-y-1/2">
          <div className="w-6 h-6 md:w-7 md:h-7 rounded-[6px] bg-gradient-to-br from-pink-400 to-pink-500 shadow-[0_0_12px_rgba(236,127,169,0.4)]" />
        </div>
        {/* Soft pink circle */}
        <div className="absolute top-[3%] left-[55%]">
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-pink-200 to-pink-300/80 shadow-[0_0_10px_rgba(236,127,169,0.25)]" />
        </div>
        {/* Blue circle */}
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
          <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.4)]" />
        </div>
      </motion.div>

      {/* Orbit 2 — Inner Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute w-[68%] h-[68%] rounded-full"
        style={{ border: '2px dashed hsl(var(--primary) / 0.18)' }}
      >
        {/* Muted pink circle */}
        <div className="absolute bottom-[5%] left-0 -translate-x-1/3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-pink-300/60 to-purple-300/50 shadow-[0_0_10px_rgba(168,85,247,0.2)]" />
        </div>
        {/* Blue square */}
        <div className="absolute bottom-[8%] right-[2%] translate-x-1/4">
          <div className="w-5 h-5 md:w-7 md:h-7 rounded-[5px] bg-gradient-to-br from-sky-400 to-blue-500 shadow-[0_0_10px_rgba(56,189,248,0.3)]" />
        </div>
      </motion.div>

      {/* Central Logo */}
      <div className="relative w-[50%] h-[50%] flex items-center justify-center z-10">
        <Image
          src={logoPath || "/logo/logokabinet.png"}
          width={500}
          height={500}
          alt="Logo Kabinet"
          data-ai-hint="phoenix emblem"
          className="drop-shadow-[0_0_30px_rgba(236,127,169,0.3)] object-contain text-transparent"
          unoptimized
        />
      </div>
    </div>
  );
}
