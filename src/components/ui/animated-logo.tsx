
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export function AnimatedLogo() {
  const orbits = [
    {
      size: 'w-full h-full',
      duration: 'animate-[spin_40s_linear_infinite]',
      elements: [
        { position: 'top-1/4 left-0', size: 'w-4 h-4', color: 'bg-pink-400', shape: 'rounded-md' },
        { position: 'bottom-1/4 right-0', size: 'w-3 h-3', color: 'bg-blue-400', shape: 'rounded-full' },
      ],
    },
    {
      size: 'w-[80%] h-[80%]',
      duration: 'animate-[spin_30s_linear_infinite_reverse]',
      elements: [
        { position: 'top-0 right-1/3', size: 'w-3 h-3', color: 'bg-pink-400', shape: 'rounded-full' },
        { position: 'bottom-0 left-1/3', size: 'w-4 h-4', color: 'bg-blue-400', shape: 'rounded-md' },
      ],
    },
  ];

  return (
    <div className="relative flex items-center justify-center w-full aspect-square">
      {/* Dashed Rings */}
      <div className="absolute w-[95%] h-[95%] border-2 border-dashed border-primary/30 rounded-full animate-[spin_60s_linear_infinite]"></div>
      <div className="absolute w-[75%] h-[75%] border-2 border-dashed border-primary/30 rounded-full animate-[spin_50s_linear_infinite_reverse]"></div>

      {/* Orbiting Shapes */}
      {orbits.map((orbit, i) => (
        <div
          key={i}
          className={cn('absolute', orbit.size, orbit.duration)}
        >
          {orbit.elements.map((el, j) => (
            <div key={j} className={cn('absolute', el.position)}>
              <div className={cn(el.size, el.color, el.shape, 'opacity-70')}></div>
            </div>
          ))}
        </div>
      ))}

      {/* Central Logo */}
      <div className="relative w-[65%] h-[65%] bg-white/50 dark:bg-primary/10 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center p-4">
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
  );
}
