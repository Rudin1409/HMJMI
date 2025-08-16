
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
    title: 'Est. 2002',
    description: '20+ tahun pengalaman dalam mencetak talenta teknologi.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: '5 Departemen',
    description: 'Divisi khusus untuk pengembangan yang komprehensif.',
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: '11 Divisi',
    description: 'Tim yang fokus untuk pengembangan keterampilan yang ditargetkan.',
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: '25+ Program',
    description: 'Berbagai kegiatan dan inisiatif yang beragam.',
  },
];

const logoPhilosophy = [
    {
        icon: <Leaf className="w-5 h-5 text-primary" />,
        title: "Padi dan Kapas",
        description: "Melambangkan kemakmuran dan kesejahteraan bagi seluruh anggota."
    },
    {
        icon: <Feather className="w-5 h-5 text-primary" />,
        title: "Perisai",
        description: "Melambangkan pertahanan dalam menghadapi tantangan dan rintangan."
    },
    {
        icon: <BookOpenCheck className="w-5 h-5 text-primary" />,
        title: "Buku dan Pena",
        description: "Melambangkan ilmu pengetahuan dan kreativitas tanpa batas."
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
        className="relative w-full bg-gradient-to-b from-pink-100/50 to-white flex items-center justify-center min-h-screen"
      >
        <div className="container mx-auto px-4 text-center">
          <Badge variant="default" className="mb-4 bg-pink-100 text-primary">
            Tentang Kami
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Mengenal <span className="text-primary">Kami</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Kenali lebih dekat Himpunan Mahasiswa Jurusan Manajemen Informatika Politeknik Negeri Sriwijaya dan perjalanan kami dalam membentuk generasi teknologi masa depan.
          </p>
          <div className="mt-8">
            <Button variant="ghost" size="icon" className="rounded-full bg-pink-100 text-primary hover:bg-pink-200">
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      <section id="about-hmif" className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Tentang <span className="text-primary">HMJMI</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-4xl mx-auto">
             Himpunan Mahasiswa Jurusan Manajemen Informatika (HMJMI) adalah organisasi kemahasiswaan khusus untuk mahasiswa Jurusan Manajemen Informatika di Politeknik Negeri Sriwijaya. Berdiri sejak tahun 2002, HMJMI berperan sebagai wadah yang mendukung pengembangan di bidang akademik dan non-akademik, serta menyediakan berbagai kegiatan yang bermanfaat bagi para mahasiswa.
            </p>
            <p className="text-muted-foreground mt-4 max-w-4xl mx-auto">
              HMJMI memiliki 5 departemen dengan 11 divisi yang berfokus pada berbagai aspek untuk meningkatkan kompetensi dan kolaborasi mahasiswa.
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
      
      <section className="bg-pink-50/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-1 bg-primary rounded-full"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Visi & <span className="text-primary">Misi</span>
                </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="p-8 shadow-lg rounded-2xl bg-white relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-50 rounded-full"></div>
                    <div className="relative z-10">
                        <div className="bg-pink-100 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <Target className="w-8 h-8"/>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Visi Kami</h3>
                        <p className="text-muted-foreground">Menjadikan HMJ Manajemen Informatika sebagai wadah untuk menyalurkan dan mengembangkan potensi mahasiswa yang aktif, kreatif, dan inovatif, serta menjalin hubungan baik di tingkat internal maupun eksternal.</p>
                    </div>
                </Card>
                <Card className="p-8 shadow-lg rounded-2xl bg-white relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-50 rounded-full"></div>
                     <div className="relative z-10">
                        <div className="bg-pink-100 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <Rocket className="w-8 h-8"/>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Misi Kami</h3>
                        <p className="text-muted-foreground">Mewujudkan HMJ Manajemen Informatika sebagai organisasi yang SMART (Solid, Melayani, Aktif, Responsif, dan Terdampak) dalam berekspresi, berkreasi, dan berprestasi.</p>
                    </div>
                </Card>
            </div>
             <p className="text-center italic text-muted-foreground mt-8 text-lg">"Spirit Perubahan"</p>
        </div>
      </section>
      
       <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-1 bg-primary rounded-full"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Filosofi Logo <span className="text-primary">HMJMI</span>
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <div className="relative aspect-square">
                        <Image src="https://placehold.co/500x500.png" layout="fill" objectFit="contain" alt="Filosofi Logo" data-ai-hint="abstract logo gears book" />
                    </div>
                    <div>
                        <Card className="p-8 shadow-lg rounded-2xl bg-white">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Filosofi Logo</h3>
                            <p className="text-muted-foreground mb-6">
                                Logo HMJMI melambangkan semangat, inovasi, dan profesionalisme. Setiap elemen memiliki makna mendalam yang mencerminkan nilai-nilai inti organisasi, dari kemakmuran hingga pertahanan dalam menghadapi tantangan, serta menjunjung tinggi ilmu pengetahuan dan kreativitas.
                            </p>
                            <div className="space-y-4">
                               {logoPhilosophy.map((item, index) => (
                                     <div key={index} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{item.title}</h4>
                                            <p className="text-muted-foreground text-sm">{item.description}</p>
                                        </div>
                                    </div>
                               ))}
                            </div>
                        </Card>
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
                    Galeri <span className="text-primary">Kami</span>
                </h2>
                <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
                    Dokumentasi kegiatan dan momen berharga HMJMI Politeknik Negeri Sriwijaya yang menggambarkan perjalanan kami dalam mengembangkan potensi mahasiswa.
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
