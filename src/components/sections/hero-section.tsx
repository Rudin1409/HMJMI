
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Calendar, Award } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-transparent">
      <div className="absolute inset-0 opacity-50"></div>
      <div className="container mx-auto px-4 min-h-screen flex items-center pt-10 pb-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <Badge variant="outline" className="border-primary/50 text-primary mb-4 py-1 px-3 font-semibold">
              Selamat Datang di HMJ MI POLSRI
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
              Building The Next <br />
              <span className="text-primary">Generation of Tech</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
             Himpunan Mahasiswa Jurusan Manajemen Informatika Politeknik Negeri Sriwijaya adalah pusat kreativitas, inovasi, dan pengembangan potensi untuk menghadapi era digital.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/proker">Jelajahi Program <ArrowRight className="ml-2"/></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4 text-center">
              <div>
                <Users className="h-7 w-7 mx-auto text-primary mb-2" />
                <p className="font-bold text-xl">101</p>
                <p className="text-sm text-muted-foreground">Anggota Aktif</p>
              </div>
              <div>
                <Calendar className="h-7 w-7 mx-auto text-primary mb-2" />
                <p className="font-bold text-xl">25+</p>
                <p className="text-sm text-muted-foreground">Acara Tahunan</p>
              </div>
              <div>
                <Award className="h-7 w-7 mx-auto text-primary mb-2" />
                <p className="font-bold text-xl">20+</p>
                <p className="text-sm text-muted-foreground">Tahun Pengalaman</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-full min-h-[450px] flex items-center justify-center md:justify-end">
             <div className="relative w-full max-w-md h-[480px]">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-300 rounded-3xl transform -rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105"></div>
                 <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300 rounded-3xl transform rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-105"></div>
                 <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl transform rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105"></div>
                <div className="relative z-10 p-2 bg-transparent rounded-3xl shadow-2xl h-full border border-white">
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                        <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden">
                            <Image src="https://placehold.co/600x300.png" layout="fill" objectFit="cover" alt="Group photo 1" data-ai-hint="university student group" className="transition-transform duration-500 hover:scale-110"/>
                        </div>
                        <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden">
                            <Image src="https://placehold.co/300x300.png" layout="fill" objectFit="cover" alt="Group photo 2" data-ai-hint="students coding event" className="transition-transform duration-500 hover:scale-110"/>
                        </div>
                        <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden">
                            <Image src="https://placehold.co/300x300.png" layout="fill" objectFit="cover" alt="Group photo 3" data-ai-hint="classroom presentation" className="transition-transform duration-500 hover:scale-110"/>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

    