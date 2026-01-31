
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Calendar, Award } from 'lucide-react';
import { homeHeroImages } from '@/data/site-data';
import { ScrollAnimation } from '../scroll-animation';

export function HeroSection() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-transparent perspective-1000">
      <div className="absolute inset-0 opacity-50"></div>
      <div className="w-full max-w-7xl mx-auto px-6 min-h-screen flex items-center pt-20 pb-16 relative">
        {/* Background Ornaments */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <ScrollAnimation className="z-10 text-center md:text-left">
            <Badge variant="outline" className="border-primary/50 text-primary mb-6 py-1.5 px-4 font-semibold text-xs sm:text-sm backdrop-blur-md bg-primary/5">
              Selamat Datang di HMJ MI POLSRI
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
              Building The Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-gradient-x bg-[length:200%_auto]">
                Generation of Tech
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed mb-8">
              Himpunan Mahasiswa Jurusan Manajemen Informatika Politeknik Negeri Sriwijaya adalah pusat kreativitas, inovasi, dan pengembangan potensi untuk menghadapi era digital.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
              <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 text-base sm:text-lg px-8 py-6 transition-all duration-300 hover:scale-105">
                <Link href="/proker">Jelajahi Program <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5 text-base sm:text-lg px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <Link href="/about">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {[
                { icon: Users, val: "101", label: "Anggota Aktif" },
                { icon: Calendar, val: "25+", label: "Acara Tahunan" },
                { icon: Award, val: "20+", label: "Tahun Pengalaman" }
              ].map((stat, idx) => (
                <div key={idx} className="group p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/30 hover:bg-white/10 transition-all duration-300 cursor-default hover:-translate-y-1">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-bold text-xl sm:text-2xl md:text-3xl text-foreground">{stat.val}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-primary transition-colors">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation className="relative h-full min-h-[400px] flex items-center justify-center md:justify-end perspective-1000">
            <div className="relative w-full max-w-lg aspect-[4/5] md:aspect-square group transition-all duration-500 hover:scale-[1.02]">
              {/* Premium Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-purple-500/30 to-blue-500/30 rounded-[2rem] blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

              {/* Tech Frame Border */}
              <div className="absolute inset-0 border-[1px] border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-sm -z-10 group-hover:border-primary/30 transition-colors duration-500 shadow-2xl shadow-black/50" />

              {/* Enhanced Corner Accents */}
              <div className="absolute -top-1 -left-1 w-16 h-16 border-t-[3px] border-l-[3px] border-primary/60 rounded-tl-[2rem] opacity-80 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
              <div className="absolute -bottom-1 -right-1 w-16 h-16 border-b-[3px] border-r-[3px] border-primary/60 rounded-br-[2rem] opacity-80 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />

              {/* Main Content Container */}
              <div className="relative h-full w-full p-3 sm:p-4 overflow-hidden rounded-[1.8rem]">
                <div className="grid grid-cols-1 grid-rows-2 gap-3 sm:gap-4 h-full">
                  {homeHeroImages.map((image, index) => (
                    <div key={index} className={`relative overflow-hidden rounded-2xl border border-white/5 group/img ${index === 0 ? 'row-span-1' : 'row-span-1'}`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 opacity-60 group-hover/img:opacity-40 transition-opacity duration-300" />
                      <Image
                        src={image.src}
                        fill
                        objectFit="cover"
                        alt={image.alt}
                        data-ai-hint={image.hint}
                        className="transition-transform duration-700 group-hover/img:scale-105"
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
