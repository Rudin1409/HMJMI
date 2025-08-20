
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ArrowUpRight, Calendar, Users, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';


const upcomingEvents = [
  {
    title: "IT Festival 2024",
    date: "15-17 Agustus 2024",
    description: "Kompetisi IT terbesar di Polsri dengan berbagai cabang lomba dan webinar.",
    image: "https://placehold.co/500x300.png",
    hint: "tech festival poster",
  },
  {
    title: "LKMM-PD 2024",
    date: "September 2024",
    description: "Pelatihan kepemimpinan dan manajemen dasar untuk calon penerus HMJMI.",
    image: "https://placehold.co/500x300.png",
    hint: "leadership training students",
  }
];

const allPrograms = [
  {
    title: 'WEBINAR',
    details: 'Semesteran • Online',
    description: 'Seminar online dengan pemateri profesional untuk menambah wawasan mahasiswa di bidang IT.',
    image: 'https://placehold.co/400x250.png',
    hint: 'professional webinar',
    category: 'akademik'
  },
  {
    title: 'Pelatihan Skill',
    details: 'Periodik • Offline/Online',
    description: 'Pelatihan untuk meningkatkan keahlian teknis mahasiswa dalam bidang tertentu.',
    image: 'https://placehold.co/400x250.png',
    hint: 'skill training',
    category: 'akademik'
  },
   {
    title: 'Technology Sharing',
    details: 'Bulanan • Online',
    description: 'Sesi berbagi pengetahuan antar anggota untuk membahas tren teknologi terbaru.',
    image: 'https://placehold.co/400x250.png',
    hint: 'tech sharing session',
    category: 'akademik'
  },
  {
    title: 'LKMM-PD',
    details: 'Tahunan • Offline',
    description: 'Latihan Keterampilan Manajemen Mahasiswa - Pra Dasar untuk kaderisasi anggota.',
    image: 'https://placehold.co/400x250.png',
    hint: 'leadership training',
    category: 'sdm'
  },
  {
    title: 'Upgrading',
    details: 'Tahunan • Offline',
    description: 'Program untuk meningkatkan solidaritas dan kualitas internal pengurus HMJMI.',
    image: 'https://placehold.co/400x250.png',
    hint: 'team building event',
    category: 'sdm'
  },
  {
    title: 'Musyawarah Besar',
    details: 'Tahunan • Offline',
    description: 'Agenda tahunan untuk evaluasi kepengurusan dan pemilihan ketua umum baru.',
    image: 'https://placehold.co/400x250.png',
    hint: 'organization meeting',
    category: 'sdm'
  },
  {
    title: 'Kunjungan Industri',
    details: 'Tahunan • Offline',
    description: 'Mengunjungi perusahaan untuk melihat langsung dunia kerja industri IT.',
    image: 'https://placehold.co/400x250.png',
    hint: 'industry visit',
    category: 'humas'
  },
  {
    title: 'Studi Banding',
    details: 'Periodik • Offline',
    description: 'Studi banding ke organisasi lain untuk bertukar pikiran dan pengalaman.',
    image: 'https://placehold.co/400x250.png',
    hint: 'organization visit',
    category: 'humas'
  },
  {
    title: 'MI CUP',
    details: 'Tahunan • Offline',
    description: 'Ajang kompetisi olahraga dan seni antar mahasiswa Manajemen Informatika.',
    image: 'https://placehold.co/400x250.png',
    hint: 'student sport competition',
    category: 'minatbakat'
  },
  {
    title: 'Bakti Sosial',
    details: 'Periodik • Offline',
    description: 'Kegiatan sosial sebagai bentuk kepedulian kepada masyarakat sekitar.',
    image: 'https://placehold.co/400x250.png',
    hint: 'social charity work',
    category: 'sosial'
  },
  {
    title: 'Donasi',
    details: 'Insidental • Online/Offline',
    description: 'Penggalangan dana untuk membantu pihak-pihak yang membutuhkan.',
    image: 'https://placehold.co/400x250.png',
    hint: 'donation drive',
    category: 'sosial'
  },
   {
    title: 'Bazar Kewirausahaan',
    details: 'Periodik • Offline',
    description: 'Mengadakan bazar untuk mendorong semangat dan kreativitas wirausaha mahasiswa.',
    image: 'https://placehold.co/400x250.png',
    hint: 'entrepreneur bazaar',
    category: 'bisnis'
  },
];

const categories = [
  { id: 'semua', name: 'Semua Program' },
  { id: 'akademik', name: 'Akademik & Pelatihan' },
  { id: 'sdm', name: 'Pengembangan Diri' },
  { id: 'humas', name: 'Relasi & Kunjungan' },
  { id: 'minatbakat', name: 'Minat & Bakat' },
  { id: 'sosial', name: 'Sosial & Kepedulian' },
  { id: 'bisnis', name: 'Bisnis & Kemitraan' },
];

export default function ProkerPage() {

  const getProgramsByCategory = (category: string) => {
    if (category === 'semua') return allPrograms;
    return allPrograms.filter(p => p.category === category);
  }

  return (
    <div className="flex flex-col">
      <section 
        id="hero-proker" 
        className="relative w-full bg-gradient-to-b from-pink-100/50 to-white flex items-center justify-center min-h-[70vh]"
      >
        <div className="container mx-auto px-4 text-center">
          <Badge variant="default" className="mb-4 bg-pink-100 text-primary">
            Agenda & Aktivitas
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Mendorong Pertumbuhan, <span className="text-primary">Menciptakan Dampak</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Jelajahi beragam program kerja yang kami rancang untuk memberdayakan mahasiswa, mengasah keterampilan, dan membangun komunitas yang solid.
          </p>
          <div className="mt-8">
             <a href="#proker-list">
              <Button variant="ghost" size="icon" className="rounded-full bg-pink-100 text-primary hover:bg-pink-200 animate-bounce">
                <ChevronDown className="h-6 w-6" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="upcoming-events" className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1 bg-primary rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Agenda <span className="text-primary">Terdekat</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
                Jangan lewatkan acara-acara menarik yang akan datang. Tandai kalender Anda dan jadilah bagian dari momen-momen penting kami.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="flex flex-col md:flex-row overflow-hidden shadow-lg rounded-2xl bg-white hover:shadow-xl transition-shadow">
                  <div className="md:w-2/5">
                     <div className="relative aspect-video md:aspect-auto md:h-full">
                       <Image src={event.image} layout="fill" objectFit="cover" alt={event.title} data-ai-hint={event.hint} />
                     </div>
                  </div>
                  <div className="md:w-3/5 p-6 flex flex-col justify-center">
                    <p className="text-sm font-semibold text-primary mb-1">{event.date}</p>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                    <Button variant="link" className="text-primary p-0 h-auto self-start font-semibold">
                      Daftar Sekarang <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
        </div>
      </section>


      <section id="proker-list" className="w-full bg-pink-50/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Jelajahi Program <span className="text-primary">Kami</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Kami berkomitmen untuk menyelenggarakan acara-acara berdampak, mulai dari pelatihan teknis hingga kegiatan pengembangan komunitas yang interaktif.
            </p>
          </div>

          <Tabs defaultValue="semua" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 h-auto mb-8">
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id} className="py-2 text-xs md:text-sm">{cat.name}</TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {getProgramsByCategory(cat.id).map((program, index) => (
                     <Card key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                        <CardContent className="p-0">
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <Image 
                                  src={program.image} 
                                  layout="fill" 
                                  objectFit="cover" 
                                  alt={program.title} 
                                  data-ai-hint={program.hint}
                                  className="transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                                <div className="flex items-center text-sm text-muted-foreground mb-3">
                                    <span>{program.details}</span>
                                </div>
                                <p className="text-muted-foreground mb-4 text-sm min-h-[40px]">
                                  {program.description}
                                </p>
                                <Button variant="link" className="text-primary p-0 h-auto font-semibold">
                                    Lihat Detail <ArrowUpRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
