'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="https://placehold.co/1920x1080"
          alt="HMIF Background"
          fill
          className="object-cover"
          priority
          data-ai-hint="university campus building"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
        <div className="max-w-4xl">
           <h1 className="font-montserrat text-5xl font-black uppercase text-white sm:text-6xl md:text-8xl">
            Himpunan Mahasiswa
          </h1>
          <h2 className="font-montserrat text-4xl font-black uppercase text-stroke-blue text-transparent sm:text-5xl md:text-7xl">
            Teknik Informatika
          </h2>
          <p className="mt-6 text-lg font-semibold text-white md:text-xl">
            Fakultas Ilmu Komputer, Universitas Sriwijaya
          </p>
        </div>
        <div className="absolute bottom-10 animate-bounce">
            <Link href="#tentang">
                <ArrowDown className="h-10 w-10 text-white" />
            </Link>
        </div>
      </div>
    </section>
  );
}
