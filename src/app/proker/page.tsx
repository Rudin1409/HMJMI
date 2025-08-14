
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const departments = [
  { id: 'semua', name: 'Semua Dinas' },
  { id: 'psdm', name: 'PSDM' },
  { id: 'adm', name: 'ADM' },
  { id: 'kominfo', name: 'Kominfo' },
  { id: 'pmb', name: 'PMB' },
  { id: 'akademik', name: 'Akademik' },
  { id: 'inti', name: 'Inti' },
  { id: 'kwu', name: 'KWU' },
  { id: 'kastrad', name: 'Kastrad' },
];

const allPrograms = [
  {
    title: 'Informatika Peduli Kasih',
    details: '5 bulan sekali • Offline',
    description: 'Informatika Peduli Kasih adalah program kerja unggulan yang dirancang sebagai bentuk...',
    image: 'https://placehold.co/400x250',
    hint: 'community charity program',
    department: 'psdm'
  },
  {
    title: 'KURASI DESAIN',
    details: '• Online',
    description: 'Kurasi desain ini merupakan merupakan proker baru dari KOMINFO dan agenda bulanan yang dilakuka...',
    image: 'https://placehold.co/400x250',
    hint: 'design workshop',
    department: 'kominfo'
  },
  {
    title: 'Ready for Professional Placement (RFPP)',
    details: '20 Mei 2025 • Online',
    description: 'Webinar ini diadakan untuk persiapan Mahasiswa Teknik Informatika dalam menghadapi Kerja Prakti...',
    image: 'https://placehold.co/400x250',
    hint: 'webinar career preparation',
    department: 'akademik'
  },
   {
    title: 'Informatics Learning Center (ILC)',
    details: 'Bulanan • Offline',
    description: 'Informatics Learning Center (ILC) adalah program kerja yang dirancang untuk menjadi pusat...',
    image: 'https://placehold.co/400x250',
    hint: 'students learning',
    department: 'akademik'
  },
  {
    title: 'SYMBIOTECH',
    details: 'Tahunan • Offline',
    description: 'Symbiosys of Technology adalah program kerja unggulan Himpunan Mahasiswa Teknik Informatika...',
    image: 'https://placehold.co/400x250',
    hint: 'technology conference',
    department: 'inti'
  },
  {
    title: 'Informatika Creative Hub',
    details: 'Mingguan • Online',
    description: 'Informatics Creative Hub adalah program kerja yang berfokus pada pembuatan konten kreatif untuk...',
    image: 'https://placehold.co/400x250',
    hint: 'creative content creation',
    department: 'kominfo'
  }
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
        className="relative w-full bg-gradient-to-b from-pink-100/50 to-white pt-28 pb-16"
      >
        <div className="container mx-auto px-4 text-center">
          <Badge variant="default" className="mb-4 bg-pink-100 text-primary">
            Program Kerja
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Program <span className="text-primary">Kerja</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Jelajahi berbagai program kerja yang telah dan akan dilaksanakan oleh HMIF. Temukan program yang sesuai dengan minat dan kebutuhan Anda.
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
              Proker <span className="text-primary">HMIF UNSRI</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Temukan berbagai program kerja yang telah dan akan dilaksanakan oleh HMIF.
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
            {filteredPrograms.map((program, index) => (
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
          
          <div className="text-center mt-12">
            <Button size="lg">Lihat Program Lainnya</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
