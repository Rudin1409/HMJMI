'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
            <Image
              src="https://placehold.co/1920x1080"
              alt="HMJMI Background"
              fill
              className="object-cover"
              priority
              data-ai-hint="university students collaborating"
            />
            <div className="absolute inset-0 bg-primary/80" />
        </div>

      <div className="container relative z-10 flex h-full items-center justify-center text-center text-primary-foreground">
        <div className="flex flex-col items-center">
            <div className="inline-block rounded-full bg-accent/20 px-4 py-2 text-sm font-semibold text-accent">
                HMJMI POLSRI REBORN
            </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Inovasi, Kolaborasi, Prestasi
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-primary-foreground/90 md:text-xl">
            Selamat Datang di Website Resmi Himpunan Mahasiswa Jurusan Manajemen Informatika
            <br />
            Politeknik Negeri Sriwijaya.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="#tentang">Jelajahi Lebih Lanjut</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground">
              <Link href="#kontak">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
