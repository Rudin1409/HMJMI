
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Briefcase, Calendar, Code, Users, ChevronDown, Rocket, Target, Leaf, Feather, BookOpenCheck } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const stats = [
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: 'Didirikan Sejak 2002',
    description: 'Lebih dari 20 tahun mencetak talenta digital.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: '5 Departemen',
    description: 'Kolaborasi lintas bidang untuk hasil optimal.',
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: '11 Divisi Khusus',
    description: 'Fokus pada pengembangan keahlian spesifik.',
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: '15+ Program Kerja',
    description: 'Inisiatif beragam untuk pemberdayaan mahasiswa.',
  },
];

const values = [
    {
        icon: <Leaf className="w-5 h-5 text-primary" />,
        title: "Kesejahteraan",
        description: "Diwakili oleh padi dan kapas, simbol kemakmuran bagi seluruh anggota."
    },
    {
        icon: <Feather className="w-5 h-5 text-primary" />,
        title: "Ketahanan",
        description: "Diwakili oleh perisai, simbol kekuatan dalam menghadapi setiap tantangan."
    },
    {
        icon: <BookOpenCheck className="w-5 h-5 text-primary" />,
        title: "Intelektualitas",
        description: "Diwakili oleh buku dan pena, simbol ilmu pengetahuan dan kreativitas tanpa batas."
    }
]

const galleryItems = [
    {
        src: "https://placehold.co/800x600.png",
        title: "LKMM-PD HMJMI POLSRI",
        year: "2024",
        hint: "student presentation"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "LKMM-PD HMJMI POLSRI",
        year: "2024",
        hint: "student audience"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "UPGRADING HMJMI POLSRI",
        year: "2024",
        hint: "group photo"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "UPGRADING HMJMI POLSRI",
        year: "2024",
        hint: "students sitting"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "MUSYAWARAH BESAR HMJMI",
        year: "2024",
        hint: "large group"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "MUSYAWARAH BESAR HMJMI",
        year: "2024",
        hint: "students listening"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "SEMINAR NASIONAL",
        year: "2024",
        hint: "student team"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "SEMINAR NASIONAL",
        year: "2024",
        hint: "student speaking"
    },
];

type GalleryItem = typeof galleryItems[0];


export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <div className="flex flex-col">
      <section 
        id="hero-about" 
        className="relative w-full bg-gradient-to-b from-pink-100/50 to-white flex items-center justify-center min-h-[70vh]"
      >
        <div className="container mx-auto px-4 text-center">
          <Badge variant="default" className="mb-4 bg-pink-100 text-primary">
            Jejak Langkah Kami
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Merangkai Inovasi, <span className="text-primary">Mencetak Talenta</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Temukan bagaimana Himpunan Mahasiswa Jurusan Manajemen Informatika Politeknik Negeri Sriwijaya berkomitmen mencetak pemimpin teknologi masa depan.
          </p>
          <div className="mt-8">
            <a href="#our-story">
              <Button variant="ghost" size="icon" className="rounded-full bg-pink-100 text-primary hover:bg-pink-200">
                <ChevronDown className="h-6 w-6" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="our-story" className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="flex justify-start mb-4">
                  <div className="w-16 h-1 bg-primary rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Awal Mula: <span className="text-primary">Visi Menjadi Aksi</span>
              </h2>
              <p className="text-muted-foreground mb-4">
               Himpunan Mahasiswa Jurusan Manajemen Informatika (HMJMI) didirikan pada tahun 2002 sebagai wadah bagi mahasiswa Manajemen Informatika Politeknik Negeri Sriwijaya untuk berkembang, berkolaborasi, dan berinovasi. Kami fokus pada pengembangan bakat akademik dan non-akademik.
              </p>
              <p className="text-muted-foreground mb-6">
                Mengusung semangat "Spirit Perubahan", kami berkomitmen menjalankan organisasi yang SMART—Solid, Melayani, Aktif, Responsif, dan Terdampak—dalam setiap program kerja kami.
              </p>
              <div className="grid grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                      <div className="bg-pink-100 text-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Target className="w-6 h-6"/>
                      </div>
                      <div>
                          <h3 className="text-lg font-bold text-gray-800">Tujuan Kami</h3>
                          <p className="text-muted-foreground text-sm">Menjadi pusat pengembangan potensi mahasiswa yang aktif, kreatif, dan inovatif.</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4">
                      <div className="bg-pink-100 text-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Rocket className="w-6 h-6"/>
                      </div>
                      <div>
                          <h3 className="text-lg font-bold text-gray-800">Strategi Kami</h3>
                          <p className="text-muted-foreground text-sm">Menciptakan organisasi yang SMART dalam setiap ekspresi, kreasi, dan prestasi.</p>
                      </div>
                  </div>
              </div>
            </div>
             <div className="relative aspect-square">
                <Image src="https://placehold.co/600x600.png" layout="fill" objectFit="cover" alt="Team discussing" className="rounded-2xl shadow-lg" data-ai-hint="students brainstorming whiteboard"/>
            </div>
          </div>
        </div>
      </section>
      
      <section id="our-impact" className="w-full bg-pink-50/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Capaian dan <span className="text-primary">Kontribusi Kami</span>
            </h2>
             <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Angka-angka ini adalah cerminan dedikasi dan pertumbuhan berkelanjutan dari komunitas kami selama bertahun-tahun.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 shadow-md hover:shadow-lg transition-shadow bg-white rounded-xl">
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="bg-pink-100 p-4 rounded-full">
                     {stat.icon}
                  </div>
                  <h3 className="text-xl font-bold">{stat.title}</h3>
                  <p className="text-muted-foreground text-sm">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
       <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-1 bg-primary rounded-full"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Makna di Balik <span className="text-primary">Simbol Kami</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
                        Logo kami adalah representasi dari tiga nilai fundamental yang menjadi landasan semangat dan gerakan kami di HMJMI.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <div className="relative aspect-square">
                        <Image src="https://placehold.co/500x500.png" layout="fill" objectFit="contain" alt="Filosofi Logo" data-ai-hint="abstract logo gears book" />
                    </div>
                    <div>
                        <div className="space-y-6">
                           {values.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-pink-50/50 transition-colors">
                                    <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">{item.title}</h4>
                                        <p className="text-muted-foreground text-sm">{item.description}</p>
                                    </div>
                                </div>
                           ))}
                        </div>
                    </div>
                </div>
            </div>
      </section>

      <section id="gallery" className="bg-pink-50/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-1 bg-primary rounded-full"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Momen <span className="text-primary">Dalam Lensa</span>
                </h2>
                <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
                    Saksikan dokumentasi berbagai momen tak terlupakan yang menangkap semangat, kolaborasi, dan pencapaian kami.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {galleryItems.map((item, index) => (
                    <Card 
                      key={index} 
                      className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl bg-white cursor-pointer group"
                      onClick={() => setSelectedImage(item)}
                    >
                        <CardContent className="p-0">
                            <div className="relative aspect-w-4 aspect-h-3">
                                <Image src={item.src} alt={item.title} width={800} height={600} objectFit="cover" data-ai-hint={item.hint} className="transition-transform duration-300 group-hover:scale-105" />
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 text-center flex-col items-center justify-center">
                            <p className="font-semibold text-primary text-sm">{item.title}</p>
                            <p className="text-xs text-primary/80">{item.year}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0">
            <div className="relative aspect-video">
              <Image src={selectedImage.src} alt={selectedImage.title} layout="fill" objectFit="contain" data-ai-hint={selectedImage.hint} />
            </div>
            <DialogHeader className="p-6 pt-2">
                <DialogTitle>{selectedImage.title}</DialogTitle>
                <DialogDescription>
                    {selectedImage.year}
                </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
