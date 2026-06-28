'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BackgroundBlobs } from '@/components/ui/background-blobs';
import { ScrollAnimation } from '@/components/scroll-animation';
import { api } from '@/lib/api-client';
import { getImageUrl } from '@/lib/utils';
import { departments } from '@/data/profile-data';
import { 
  ArrowRight, 
  Calendar, 
  Loader2, 
  ChevronDown,
  Briefcase,
  Rocket,
  Award,
  Heart,
  Lightbulb,
  Users
} from 'lucide-react';

const renderIcon = (iconName: string, className = "h-5 w-5 text-primary") => {
  switch (iconName) {
    case 'Rocket':
      return <Rocket className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'Heart':
      return <Heart className={className} />;
    case 'Lightbulb':
      return <Lightbulb className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'Briefcase':
    default:
      return <Briefcase className={className} />;
  }
};

// Fallback programs if DB is empty
const localFallbackPrograms = [
  {
    id: 1,
    title: 'IT Festival',
    category: 'unggulan',
    department_id: 'inti',
    description: 'Information Technology Festival atau yang disingkat dengan IT Festival merupakan serangkaian acara IT tahunan. Dengan rangkaian acara kompetisi, pelatihan, dan seminar sebagai ajang edukatif.',
    image_url: '/Galeri/IT-fest.webp',
    images: ['/Galeri/IT-fest.webp'],
    link: 'https://it-fest-2025-pi.vercel.app/',
    icon: 'Rocket',
    frequency: 'Setiap Tahun',
    type: 'Offline',
  },
  {
    id: 2,
    title: 'Seminar Bisnis',
    category: 'pengembangan',
    department_id: 'bistra',
    description: 'Kegiatan Seminar Bisnis bertujuan menambah wawasan dan pengetahuan mengenai bisnis dan berwirausaha serta memotivasi mahasiswa/i untuk memulai usaha sejak dini.',
    image_url: '/Galeri/Sembis.webp',
    images: ['/Galeri/Sembis.webp'],
    link: null,
    icon: 'Briefcase',
    frequency: 'Setiap Tahun',
    type: 'Offline',
  },
  {
    id: 3,
    title: 'UPGRADING',
    category: 'komunitas',
    department_id: 'humas',
    description: 'Pelatihan yang dikhususkan untuk kepengurusan baru demi meningkatkan kemampuan dalam bidang public speaking serta desain grafis.',
    image_url: '/proker/upgrading.webp',
    images: ['/proker/upgrading.webp'],
    link: null,
    icon: 'Award',
    frequency: '1 Kali Per Periode',
    type: 'Offline',
  },
  {
    id: 4,
    title: 'BAKSOMI',
    category: 'komunitas',
    department_id: 'kesma',
    description: 'Bakti sosial jurusan manajemen informatika yang didalamnya terdapat rangkaian kegiatan bermanfaat seperti bantuan sosial, kunjungan ke panti, tausiyah serta bagi-bagi takjil.',
    image_url: '/proker/baksomiii.webp',
    images: ['/proker/baksomiii.webp'],
    link: null,
    icon: 'Heart',
    frequency: 'Setiap Tahun',
    type: 'Offline',
  },
  {
    id: 5,
    title: 'SINTAK',
    category: 'komunitas',
    department_id: 'ptkp',
    description: 'Sebuah study club yang dibentuk sebagai wadah mahasiswa/i Jurusan Manajemen Informatika untuk mengembangkan soft skill dalam pemrograman.',
    image_url: '/proker/sintak.webp',
    images: ['/proker/sintak.webp'],
    link: null,
    icon: 'Lightbulb',
    frequency: 'Setiap Minggu',
    type: 'Offline',
  },
  {
    id: 6,
    title: 'POSMI',
    category: 'komunitas',
    department_id: 'psdm',
    description: 'Acara kompetisi yang menyatukan peserta dari berbagai tim, kelas, dan program studi untuk berkompetisi dalam beragam cabang olahraga dan seni.',
    image_url: '/proker/posmi2024.webp',
    images: ['/proker/posmi2024.webp'],
    link: null,
    icon: 'Users',
    frequency: 'Setiap Tahun',
    type: 'Offline',
  }
];

export default function ProkerPage() {
  const [dbPrograms, setDbPrograms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('semua');

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await api.getWorkPrograms();
        setDbPrograms(data || []);
      } catch (e) {
        console.error("Gagal mengambil data program kerja dinamis", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadPrograms();
  }, []);

  const programsToRender = dbPrograms.length > 0 ? dbPrograms : localFallbackPrograms;

  // Filter programs based on active department tab
  const filteredPrograms = activeTab === 'semua' 
    ? programsToRender 
    : programsToRender.filter(p => p.department_id === activeTab);

  const getDinasBadge = (deptId?: string | null) => {
    if (!deptId) return 'HMJ MI';
    const dept = departments.find(d => d.id === deptId);
    return dept ? dept.name : deptId.toUpperCase();
  };

  return (
    <div className="flex flex-col">
      
      {/* Hero Section */}
      <section
        id="hero-proker"
        className="relative w-full flex items-center justify-center min-h-screen py-20 bg-transparent"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollAnimation direction="down">
            <Badge variant="outline" className="mb-6 border-primary/50 text-foreground bg-primary/10 px-6 py-2 text-sm md:text-base font-semibold rounded-full hover:scale-105 transition-transform">
              Aktivitas & Inisiatif
            </Badge>
          </ScrollAnimation>

          <ScrollAnimation delay={1}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 tracking-tight">
              Inovasi Melalui <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-600 animate-pulse">Aksi Nyata</span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation delay={2}>
            <p className="mt-6 max-w-3xl mx-auto text-base md:text-xl text-muted-foreground leading-relaxed font-light">
              Temukan berbagai program kerja menarik dari HMJ MI yang dikelompokkan langsung berdasarkan masing-masing Dinas / Departemen pelaksana.
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={3} className="mt-12">
            <a href="#proker-list">
              <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-primary/20 bg-background/80 text-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary shadow-lg transition-all duration-300">
                <ChevronDown className="h-6 w-6" />
              </Button>
            </a>
          </ScrollAnimation>
        </div>
      </section>

      {/* Program list Section */}
      <section id="proker-list" className="w-full py-16 md:py-24 bg-primary/40 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Department Selection Tabs */}
          <div className="flex flex-col items-center mb-16">
            <ScrollAnimation direction="down" className="mb-8 text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground">
                Jelajahi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Program Kerja Kami</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-md mx-auto">Saring program kerja berdasarkan departemen yang bertanggung jawab.</p>
            </ScrollAnimation>

            <ScrollAnimation direction="up" className="w-full">
              <div className="flex flex-wrap justify-center gap-2 bg-slate-100 dark:bg-white/5 p-2 rounded-2xl md:rounded-full max-w-4xl mx-auto border border-border/40">
                <button
                  onClick={() => setActiveTab('semua')}
                  className={`px-5 py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'semua'
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setActiveTab('inti')}
                  className={`px-5 py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'inti'
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  BPH / Inti
                </button>
                <button
                  onClick={() => setActiveTab('ptkp')}
                  className={`px-5 py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'ptkp'
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  PTKP
                </button>
                <button
                  onClick={() => setActiveTab('humas')}
                  className={`px-5 py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'humas'
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  HUMAS
                </button>
                <button
                  onClick={() => setActiveTab('psdm')}
                  className={`px-5 py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'psdm'
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  PSDM
                </button>
                <button
                  onClick={() => setActiveTab('kesma')}
                  className={`px-5 py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'kesma'
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  KESMA
                </button>
                <button
                  onClick={() => setActiveTab('bistra')}
                  className={`px-5 py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'bistra'
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  BISTRA
                </button>
              </div>
            </ScrollAnimation>
          </div>

          {/* Programs Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program, index) => {
                // Get cover image: first image in images array, or image_url, or fallback placeholder
                const imagesArray = Array.isArray(program.images) ? program.images : [];
                const coverImage = imagesArray.length > 0 
                  ? imagesArray[0] 
                  : (program.image_url ? program.image_url : null);

                return (
                  <ScrollAnimation key={program.id || index} delay={index} direction="up" className="h-full">
                    <Card className="h-full bg-card/40 backdrop-blur-sm border-border/60 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col group relative">
                      
                      {/* Image section */}
                      <div className="relative aspect-video w-full overflow-hidden border-b border-border/10 bg-muted/20">
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />
                        
                        {coverImage && coverImage !== '/placeholder.png' ? (
                          <ImageWithSkeleton
                            src={getImageUrl(coverImage)}
                            alt={program.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            containerClassName="absolute inset-0"
                          />
                        ) : (
                          // Premium fallback gradient banner with the icon centered
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-primary/10 to-purple-950 flex items-center justify-center">
                            <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-primary shadow-inner">
                              {renderIcon(program.icon || 'Briefcase', "h-6 w-6 text-primary")}
                            </div>
                          </div>
                        )}
                        
                        {/* Badges on Banner */}
                        <div className="absolute top-3 left-3 z-20 flex gap-1.5">
                          <Badge className="bg-primary text-white border border-primary/20 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                            {program.type || 'Offline'}
                          </Badge>
                          <Badge variant="secondary" className="bg-slate-900/80 text-blue-400 border border-white/10 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                            Dinas: {getDinasBadge(program.department_id)}
                          </Badge>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          <span>{program.frequency || 'Setiap Periode'}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                          {program.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light line-clamp-3">
                          {program.description}
                        </p>

                        {/* Button Link */}
                        <div className="mt-auto pt-4 border-t border-border/40 flex justify-start">
                          <Button asChild variant="link" className="text-primary hover:text-primary/80 p-0 h-auto gap-2 group/btn font-semibold text-sm">
                            <Link href={program.id ? `/proker/read?id=${program.id}` : '/proker'}>
                              <span>Jelajahi Program</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>

                    </Card>
                  </ScrollAnimation>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground italic">Tidak ada program kerja yang ditemukan untuk departemen ini.</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
