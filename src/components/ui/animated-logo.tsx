
'use client';

import Image from 'next/image';

export function AnimatedLogo() {
  return (
    <div className="relative flex items-center justify-center w-full h-full aspect-square">
      {/* Orbiting Shapes - Pink/Primary */}
      <div className="absolute w-full h-full animate-spin-slow" style={{ animationDuration: '25s' }}>
        <div className="absolute top-[15%] left-[15%] w-10 h-10 bg-primary/50 rounded-lg"></div>
        <div className="absolute bottom-[10%] left-[20%] w-8 h-8 bg-primary/70 rounded-full"></div>
      </div>

       {/* Orbiting Shapes - Blue */}
      <div className="absolute w-full h-full animate-spin-slow" style={{ animationDuration: '35s', animationDirection: 'reverse' }}>
        <div className="absolute bottom-[20%] right-[10%] w-12 h-12 bg-blue-400/50 rounded-full"></div>
        <div className="absolute top-[10%] right-[25%] w-6 h-6 bg-blue-400/70 rounded-md"></div>
      </div>
      
      {/* Rotating Dashed Circles */}
      <div className="absolute w-[85%] h-[85%] border-2 border-dashed border-primary/40 rounded-full animate-spin-slow" style={{ animationDuration: '60s' }}></div>
      <div className="absolute w-[70%] h-[70%] border-2 border-dashed border-blue-400/40 rounded-full animate-spin-slow" style={{ animationDuration: '50s', animationDirection: 'reverse' }}></div>

      {/* Central Logo Container */}
      <div className="relative w-[65%] h-[65%]">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-pink-200 dark:from-primary/10 dark:to-primary/30 rounded-full shadow-lg"></div>
        <div className="relative p-4 w-full h-full flex items-center justify-center">
            <Image
            src="https://placehold.co/500x500.png"
            width={500}
            height={500}
            alt="Logo Kabinet Karsadhikara"
            data-ai-hint="phoenix emblem"
            className="drop-shadow-lg w-[85%] h-[85%]"
            />
        </div>
      </div>
    </div>
  );
}
