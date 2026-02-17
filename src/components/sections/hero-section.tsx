'use client';

import Image from 'next/image';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Calendar, Award } from 'lucide-react';
import { homeHeroImages } from '@/data/site-data';
import { ScrollAnimation } from '../scroll-animation';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { TypewriterText } from '@/components/ui/typewriter-text';

export function HeroSection() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-transparent perspective-1000">

      <div className="w-full max-w-7xl mx-auto px-6 min-h-screen flex items-center pt-20 pb-16 relative">
        {/* Lightweight static glow */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full pointer-events-none" style={{ filter: 'blur(40px)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div className="z-10 text-center md:text-left">

            <ScrollAnimation>
              <Badge variant="outline" className="border-primary/50 text-primary mb-6 py-1.5 px-4 font-semibold text-xs sm:text-sm bg-primary/10">
                Selamat Datang di HMJ MI POLSRI
              </Badge>
            </ScrollAnimation>

            {/* Phase 8: Typewriter Effect */}
            <ScrollAnimation delay={1}>
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-2">
                  Building The Next <br />
                </h1>
                <TypewriterText
                  texts={[
                    "Generation of Tech",
                    "Leaders of Innovation",
                    "Architects of Future",
                    "Masters of Code"
                  ]}
                  typingSpeed={150}
                  deletingSpeed={80}
                  delayBetween={3000}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-500 justify-center md:justify-start min-h-[2.4em] md:min-h-[2.2em] leading-tight items-start pt-[0.1em]"
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={2}>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed mb-8">
                Himpunan Mahasiswa Jurusan Manajemen Informatika Politeknik Negeri Sriwijaya adalah pusat kreativitas, inovasi, dan pengembangan potensi untuk menghadapi era digital.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12 items-center">
                {/* Phase 8: Magnetic Button */}
                <Link href="/proker">
                  <MagneticButton className="shadow-primary/25">
                    Jelajahi Program <ArrowRight className="h-5 w-5" />
                  </MagneticButton>
                </Link>

                <Button asChild size="lg" variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5 text-base sm:text-lg px-8 py-6 h-auto transition-all duration-300 hover:scale-105">
                  <Link href="/about">Pelajari Lebih Lanjut</Link>
                </Button>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {[
                { icon: Users, val: "101", label: "Anggota Aktif" },
                { icon: Calendar, val: "25+", label: "Acara Tahunan" },
                { icon: Award, val: "20+", label: "Tahun Pengalaman" }
              ].map((stat, idx) => (
                <ScrollAnimation key={idx} delay={4 + idx}>
                  <SpotlightCard className="group p-4 bg-white/5 border-white/10 hover:-translate-y-1 cursor-default h-full">
                    <div className="flex flex-col items-center justify-center text-center relative z-10">
                      <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <p className="font-bold text-xl sm:text-2xl md:text-3xl text-foreground">{stat.val}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-primary transition-colors">{stat.label}</p>
                    </div>
                  </SpotlightCard>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          <ScrollAnimation delay={2} className="relative h-full min-h-[400px] flex items-center justify-center md:justify-end perspective-1000">
            {/* Keeps existing 3D Image logic (no changes needed) */}
            <div className="relative w-full max-w-lg aspect-[4/5] md:aspect-square group transition-all duration-500 hover:scale-[1.02] hover:rotate-y-12">
              {/* Premium Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-purple-500/30 to-blue-500/30 rounded-[2rem] blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

              {/* Tech Frame Border */}
              <div className="absolute inset-0 border-[1px] border-white/10 rounded-[2rem] bg-white/10 -z-10 group-hover:border-primary/30 transition-colors duration-500 shadow-2xl shadow-black/50" />

              {/* Enhanced Corner Accents */}
              <div className="absolute -top-1 -left-1 w-16 h-16 border-t-[3px] border-l-[3px] border-primary/60 rounded-tl-[2rem] opacity-80 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
              <div className="absolute -bottom-1 -right-1 w-16 h-16 border-b-[3px] border-r-[3px] border-primary/60 rounded-br-[2rem] opacity-80 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />

              {/* Main Content Container */}
              <div className="relative h-full w-full p-3 sm:p-4 overflow-hidden rounded-[1.8rem]">
                <div className="grid grid-cols-1 grid-rows-2 gap-3 sm:gap-4 h-full">
                  {homeHeroImages.map((image, index) => (
                    <div key={index} className={`relative overflow-hidden rounded-2xl border border-white/5 group/img ${index === 0 ? 'row-span-1' : 'row-span-1'}`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 opacity-60 group-hover/img:opacity-40 transition-opacity duration-300" />
                      <ImageWithSkeleton
                        src={image.src}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                        alt={image.alt}
                        containerClassName="absolute inset-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
