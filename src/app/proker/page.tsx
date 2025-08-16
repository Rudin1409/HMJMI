
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const departments = [
  { id: 'semua', name: 'Semua Kategori' },
  { id: 'akademik', name: 'Akademik & Pelatihan' },
  { id: 'sdm', name: 'Pengembangan SDM' },
  { id: 'humas', name: 'Hubungan Masyarakat' },
  { id: 'minatbakat', name: 'Minat & Bakat' },
  { id: 'sosial', name: 'Sosial & Kesejahteraan' },
  { id: 'bisnis', name: 'Bisnis & Kemitraan' },
];

const allPrograms = [
  {
    title: 'WEBINAR',
    details: 'Semesteran • Online',
    description: 'Seminar online dengan pemateri profesional untuk menambah wawasan mahasiswa di bidang IT.',
    image: 'https://placehold.co/400x250.png',
    hint: 'professional webinar',
    department: 'akademik'
  },
  {
    title: 'Pelatihan Skill',
    details: 'Periodik • Offline/Online',
    description: 'Pelatihan untuk meningkatkan keahlian teknis mahasiswa dalam bidang tertentu.',
    image: 'https://placehold.co/400x250.png',
    hint: 'skill training',
    department: 'akademik'
  },
   {
    title: 'Technology Sharing',
    details: 'Bulanan • Online',
    description: 'Sesi berbagi pengetahuan antar anggota untuk membahas tren teknologi terbaru.',
    image: 'https://placehold.co/400x250.png',
    hint: 'tech sharing session',
    department: 'akademik'
  },
  {
    title: 'LKMM-PD',
    details: 'Tahunan • Offline',
    description: 'Latihan Keterampilan Manajemen Mahasiswa - Pra Dasar untuk kaderisasi anggota.',
    image: 'https://placehold.co/400x250.png',
    hint: 'leadership training',
    department: 'sdm'
  },
  {
    title: 'Upgrading',
    details: 'Tahunan • Offline',
    description: 'Program untuk meningkatkan solidaritas dan kualitas internal pengurus HMJMI.',
    image: 'https://placehold.co/400x250.png',
    hint: 'team building event',
    department: 'sdm'
  },
  {
    title: 'Musyawarah Besar',
    details: 'Tahunan • Offline',
    description: 'Agenda tahunan untuk evaluasi kepengurusan dan pemilihan ketua umum baru.',
    image: 'https://placehold.co/400x250.png',
    hint: 'organization meeting',
    department: 'sdm'
  },
  {
    title: 'Kunjungan Industri',
    details: 'Tahunan • Offline',
    description: 'Mengunjungi perusahaan untuk melihat langsung dunia kerja industri IT.',
    image: 'https://placehold.co/400x250.png',
    hint: 'industry visit',
    department: 'humas'
  },
  {
    title: 'Studi Banding',
    details: 'Periodik • Offline',
    description: 'Studi banding ke organisasi lain untuk bertukar pikiran dan pengalaman.',
    image: 'https://placehold.co/400x250.png',
    hint: 'organization visit',
    department: 'humas'
  },
  {
    title: 'MI CUP',
    details: 'Tahunan • Offline',
    description: 'Ajang kompetisi olahraga dan seni antar mahasiswa Manajemen Informatika.',
    image: 'https://placehold.co/400x250.png',
    hint: 'student sport competition',
    department: 'minatbakat'
  },
  {
    title: 'Bakti Sosial',
    details: 'Periodik • Offline',
    description: 'Kegiatan sosial sebagai bentuk kepedulian kepada masyarakat sekitar.',
    image: 'https://placehold.co/400x250.png',
    hint: 'social charity work',
    department: 'sosial'
  },
  {
    title: 'Donasi',
    details: 'Insidental • Online/Offline',
    description: 'Penggalangan dana untuk membantu pihak-pihak yang membutuhkan.',
    image: 'https://placehold.co/400x250.png',
    hint: 'donation drive',
    department: 'sosial'
  },
   {
    title: 'Bazar Kewirausahaan',
    details: 'Periodik • Offline',
    description: 'Mengadakan bazar untuk mendorong semangat dan kreativitas wirausaha mahasiswa.',
    image: 'https://placehold.co/400x250.png',
    hint: 'entrepreneur bazaar',
    department: 'bisnis'
  },
];


export default function ProkerPage() {
  const [activeDept, setActiveDept] = useState('semua');
  
  const filteredPrograms = activeDept === 'semua' 
    ? allPrograms 
    : allPrograms.filter(p => p.department === activeDept);

  return (
    <div className="flex flex-col">
      <section 
        id="hero-proker" 
        className="relative w-full bg-gradient-to-b from-pink-100/50 to-white flex items-center justify-center min-h-screen"
      >
        <div className="container mx-auto px-4 text-center">
          <Badge variant="default" className="mb-4 bg-pink-100 text-primary">
            Program Kerja
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Inisiatif & <span className="text-primary">Kegiatan</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Jelajahi berbagai program kerja yang telah dan akan dilaksanakan oleh HMJMI. Temukan program yang sesuai dengan minat dan kebutuhan Anda.
          </p>
          <div className="mt-8">
            <Button variant="ghost" size="icon" className="rounded-full bg-pink-100 text-primary hover:bg-pink-200 animate-bounce">
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      <section id="proker-list" className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Program Kerja <span className="text-primary">HMJMI POLSRI</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Kami berdedikasi untuk menyelenggarakan acara yang berdampak, mulai dari pelatihan teknis hingga acara pengembangan komunitas yang dinamis.
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {departments.map((dept) => (
              <Button
                key={dept.id}
                variant={activeDept === dept.id ? 'default' : 'outline'}
                className={cn(
                  'rounded-full',
                  activeDept === dept.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-gray-600 border-gray-300'
                )}
                onClick={() => setActiveDept(dept.id)}
              >
                {dept.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.length > 0 ? filteredPrograms.map((program, index) => (
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
            )) : (
                 <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Program kerja untuk kategori ini akan segera hadir!</p>
                </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg">Muat Lebih Banyak</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
