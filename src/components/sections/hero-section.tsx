'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const heroImages = [
  { src: 'https://placehold.co/1920x1080', alt: 'HMJMI Event 1', hint: 'student organization meeting' },
  { src: 'https://placehold.co/1920x1081', alt: 'HMJMI Event 2', hint: 'students coding computer' },
  { src: 'https://placehold.co/1920x1082', alt: 'HMJMI Event 3', hint: 'university campus' },
];

export function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <section id="home" className="relative h-[90vh] w-full overflow-hidden md:h-screen">
      <Carousel
        className="absolute inset-0 h-full w-full"
        opts={{ loop: true }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint={image.hint}
                />
                <div className="absolute inset-0 bg-primary/70" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="container relative z-10 flex h-full items-center justify-center text-center text-primary-foreground">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Inovasi, Kolaborasi, Prestasi
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
            Selamat Datang di Himpunan Mahasiswa Jurusan Manajemen Informatika Politeknik Negeri Sriwijaya.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="#tentang">Jelajahi Lebih Lanjut</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="#kontak">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
