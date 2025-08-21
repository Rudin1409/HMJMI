
'use client';

import Image from 'next/image';

export function AnimatedLogo() {
  return (
    <div className="relative flex items-center justify-center w-full h-full aspect-square">
      <div className="absolute w-full h-full animate-orbit-1">
        <div className="absolute top-[10%] left-[10%] w-3 h-3 bg-primary/80 rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-4 h-4 bg-primary/80 rounded-full" />
      </div>
      <div className="absolute w-full h-full animate-orbit-2">
        <div className="absolute top-[20%] right-[5%] w-2 h-2 bg-blue-400/80 rounded-full" />
        <div className="absolute bottom-[15%] left-[25%] w-3 h-3 bg-blue-400/80 rounded-full" />
      </div>
      <div className="absolute w-full h-full animate-orbit-3">
        <div className="absolute top-[5%] right-[50%] w-3 h-3 bg-pink-400/80 rounded-full" />
        <div className="absolute bottom-[5%] left-[50%] w-2 h-2 bg-pink-400/80 rounded-full" />
      </div>

      {/* Central Logo Container */}
      <div className="relative p-4 w-[65%] h-[65%] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-pink-200 dark:from-primary/10 dark:to-primary/30 rounded-full shadow-lg" />
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/logo/logokabinet.png"
            width={500}
            height={500}
            alt="Logo Kabinet Karsadhikara"
            data-ai-hint="phoenix emblem"
            className="drop-shadow-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
}

    