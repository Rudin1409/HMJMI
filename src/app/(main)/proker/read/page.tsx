'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { ScrollAnimation } from '@/components/scroll-animation';
import { api } from '@/lib/api-client';
import { getImageUrl } from '@/lib/utils';
import { departments } from '@/data/profile-data';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  MapPin, 
  Award, 
  CheckCircle2,
  ExternalLink,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Benefit {
  title: string;
  description: string;
}

interface ProgramDetails {
  id: number;
  title: string;
  category: 'unggulan' | 'pengembangan' | 'komunitas' | 'agenda';
  department_id?: string | null;
  description: string;
  image_url: string | null;
  link: string | null;
  icon: string;
  frequency?: string | null;
  type?: string | null;
  benefits?: Benefit[] | null;
  highlights?: string[] | null;
}

function WorkProgramDetailContent() {
  const searchParams = useSearchParams();
  const programId = searchParams.get('id');

  const [program, setProgram] = useState<ProgramDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Carousel State
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!programId) return;

    const fetchProgramDetails = async () => {
      setIsLoading(true);
      try {
        const data = await api.getWorkProgram(programId);
        setProgram(data);
      } catch (err: any) {
        console.error('Gagal memuat detail program kerja:', err);
        setError(err.message || 'Gagal memuat detail program kerja.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgramDetails();
  }, [programId]);

  const getDepartmentName = (deptId?: string | null) => {
    if (!deptId) return 'Umum / HMJ MI';
    const dept = departments.find(d => d.id === deptId);
    return dept ? dept.fullName : deptId.toUpperCase();
  };

  const getDepartmentBadge = (deptId?: string | null) => {
    if (!deptId) return 'HMJ MI';
    const dept = departments.find(d => d.id === deptId);
    return dept ? dept.name : deptId.toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-transparent">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-center px-4 bg-transparent">
        <AlertCircle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold text-foreground">Halaman Tidak Ditemukan</h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          {error || 'Program kerja yang Anda cari tidak tersedia atau telah dihapus.'}
        </p>
        <Button asChild className="mt-6">
          <Link href="/proker">Kembali ke Program Kerja</Link>
        </Button>
      </div>
    );
  }

  const resolvedType = program.type || 'Offline';
  const resolvedFreq = program.frequency || 'Setiap Periode';
  const resolvedBenefits = Array.isArray(program.benefits) ? program.benefits : [];
  const resolvedHighlights = Array.isArray(program.highlights) ? program.highlights : [];

  const imagesList = Array.isArray(program.images) ? program.images : (program.image_url ? [program.image_url] : []);

  const nextSlide = () => {
    setActiveSlide(prev => (prev + 1) % imagesList.length);
  };
  const prevSlide = () => {
    setActiveSlide(prev => (prev - 1 + imagesList.length) % imagesList.length);
  };

  return (
    <div className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-transparent">
      {/* Background Blobs for Premium Glassmorphism Look */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Breadcrumbs Navigation */}
        <ScrollAnimation direction="down" className="mb-6">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/proker" className="hover:text-primary transition-colors">Program Kerja</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{program.title}</span>
          </nav>
        </ScrollAnimation>

        {/* Subheader Badges & Metadata */}
        <ScrollAnimation direction="left" className="space-y-4 mb-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 px-3 py-1 text-xs font-semibold rounded-full uppercase">
              {resolvedType}
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-3 py-1 text-xs font-semibold rounded-full">
              Dinas: {getDepartmentBadge(program.department_id)}
            </Badge>
            {program.category && (
              <Badge variant="outline" className="border-border/80 px-3 py-1 text-xs font-medium rounded-full capitalize">
                Kategori: {program.category}
              </Badge>
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
            {program.title}
          </h1>

          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span>Pelaksanaan: <strong className="text-foreground">{resolvedFreq}</strong></span>
          </div>
        </ScrollAnimation>

        {/* Big Banner Image Carousel */}
        {program.category !== 'agenda' && imagesList.length > 0 && (
          <ScrollAnimation direction="up" className="relative w-full aspect-video md:max-h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12 border border-border/50 group/carousel bg-black/10">
            {/* Slides container */}
            <div className="relative w-full h-full">
              {imagesList.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    idx === activeSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
                  }`}
                >
                  <ImageWithSkeleton
                    src={getImageUrl(img)}
                    alt={`${program.title} slide ${idx + 1}`}
                    fill
                    className="object-cover"
                    containerClassName="absolute inset-0"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />

            {/* Navigation Arrows */}
            {imagesList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-black/45 hover:bg-primary text-white rounded-full flex items-center justify-center transition-all z-20 backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 hover:scale-105"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-black/45 hover:bg-primary text-white rounded-full flex items-center justify-center transition-all z-20 backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 hover:scale-105"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Pagination Indicators */}
            {imagesList.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {imagesList.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeSlide ? 'w-6 bg-primary' : 'w-2.5 bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            )}
          </ScrollAnimation>
        )}

        {/* Layout Grid: Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. Program Description */}
            <ScrollAnimation direction="left" className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="h-6 w-1 bg-primary rounded-full"></span>
                Deskripsi Program
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light whitespace-pre-line">
                {program.description}
              </p>
              {program.link && (
                <div className="pt-2">
                  <Button asChild className="rounded-full shadow-lg gap-2">
                    <a href={program.link} target="_blank" rel="noopener noreferrer">
                      <span>Kunjungi Website Acara</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </ScrollAnimation>

            {/* 2. Program Benefits */}
            {resolvedBenefits.length > 0 && (
              <ScrollAnimation direction="up" className="space-y-6 pt-6 border-t border-border/40">
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <span className="h-6 w-1 bg-primary rounded-full"></span>
                  Manfaat Program
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resolvedBenefits.map((benefit, index) => (
                    <Card key={index} className="bg-card/30 backdrop-blur-sm border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-300">
                      <CardContent className="p-5 space-y-2.5">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <h4 className="font-bold text-base text-foreground">{benefit.title}</h4>
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollAnimation>
            )}

          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* 1. General Info Card */}
            <ScrollAnimation direction="right">
              <Card className="bg-card/40 backdrop-blur-sm border-border/50 overflow-hidden">
                <div className="bg-primary/5 px-6 py-4 border-b border-border/30">
                  <h4 className="font-bold text-base text-foreground">Detail Informasi</h4>
                </div>
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Frekuensi</p>
                      <p className="text-sm font-semibold text-foreground mt-0.5">{resolvedFreq}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Dinas / Departemen</p>
                      <p className="text-sm font-semibold text-foreground mt-0.5">{getDepartmentName(program.department_id)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Tipe Pelaksanaan</p>
                      <p className="text-sm font-semibold text-foreground mt-0.5">{resolvedType}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* 2. Highlights Card */}
            {resolvedHighlights.length > 0 && (
              <ScrollAnimation direction="right" delay={1}>
                <Card className="bg-card/40 backdrop-blur-sm border-border/50 overflow-hidden">
                  <div className="bg-primary/5 px-6 py-4 border-b border-border/30">
                    <h4 className="font-bold text-base text-foreground flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      Highlights Acara
                    </h4>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-3.5">
                      {resolvedHighlights.map((hl, index) => (
                        <li key={index} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                          <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            )}

          </div>
        </div>

        {/* Back Link at the bottom */}
        <ScrollAnimation direction="up" className="pt-12 border-t border-border/40 mt-12 flex justify-start">
          <Button asChild variant="outline" className="rounded-full gap-2 border-border/80 hover:bg-muted">
            <Link href="/proker">
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke semua program</span>
            </Link>
          </Button>
        </ScrollAnimation>

      </div>
    </div>
  );
}

export default function WorkProgramDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <WorkProgramDetailContent />
    </Suspense>
  );
}
