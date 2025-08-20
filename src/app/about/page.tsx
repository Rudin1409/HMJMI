
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar, Code, Users, ChevronDown, Rocket, Target, Leaf, Feather, BookOpenCheck, Eye, ListChecks } from 'lucide-react';
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

  const missionPoints = [
    "Meningkatkan kepedulian sosial dan memperkuat nilai-nilai religius bagi Mahasiswa/i Jurusan Manajemen Informatika.",
    "Mendorong pengembangan kompetensi dan prestasi akademik serta mengelola dan menyalurkan aspirasi Mahasiswa/i Jurusan Manajemen Informatika.",
    "Menjadikan Himpunan Mahasiswa Jurusan Informatika sebagai pusat informasi melalui Media Kreatif dan penyebaran berita yang informatif bagi Mahasiswa/i Manajemen Informatika.",
    "Mewadahi serta Menyalurkan minat dan bakat di bidang non-akademik yang terdapat pada Mahasiswa/i Jurusan Manajemen Informatika.",
    "Mengembangkan jiwa kewirausahaan Mahasiswa/i Jurusan Manajemen Informatika melalui pengelolaan bisnis dan layanan kemitraan."
  ];

  return (
    <div className="flex flex-col">
       <section
        id="hero-about"
        className="relative w-full flex items-center justify-center min-h-screen overflow-hidden bg-transparent"
      >
        <div className="absolute inset-0 bg-[url('/dot-grid.svg')] bg-repeat bg-center opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="absolute w-72 h-72 bg-pink-100/50 rounded-full -top-10 -left-20 blur-2xl"></div>
            <div className="absolute w-72 h-72 bg-blue-100/50 rounded-full -bottom-10 -right-20 blur-2xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                 <div className="relative z-10 text-center md:text-left">
                    <Badge variant="default" className="mb-4 bg-pink-100 text-primary">
                      Jejak Langkah Kami
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
                      Merangkai Inovasi, <span className="text-primary">Mencetak Talenta</span>
                    </h1>
                    <p className="mt-4 max-w-md mx-auto md:mx-0 text-lg text-muted-foreground">
                      Temukan bagaimana Himpunan Mahasiswa Jurusan Manajemen Informatika Politeknik Negeri Sriwijaya berkomitmen mencetak pemimpin teknologi masa depan.
                    </p>
                    <div className="mt-8">
                      <a href="#vision-mission">
                        <Button variant="ghost" size="icon" className="rounded-full bg-pink-100 text-primary hover:bg-pink-200 animate-bounce mx-auto md:mx-0">
                          <ChevronDown className="h-6 w-6" />
                        </Button>
                      </a>
                    </div>
                </div>
                <div className="relative flex items-center justify-center h-[500px] md:h-auto md:aspect-square">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 md:w-64 md:h-64 bg-pink-100 rounded-full shadow-inner"></div>
                    </div>
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-52 md:h-52 z-10">
                         <Image src="https://placehold.co/300x300.png" width={300} height={300} alt="Team Main" className="rounded-full object-cover shadow-2xl border-8 border-white" data-ai-hint="team leader" />
                    </div>
                    
                    <div className="absolute top-8 left-1/2 -translate-x-[80%] w-24 h-24 md:w-32 md:h-32">
                         <Image src="https://placehold.co/200x200.png" width={200} height={200} alt="Team 1" className="rounded-full object-cover shadow-lg border-4 border-white" data-ai-hint="student group"/>
                    </div>
                    
                    <div className="absolute bottom-8 left-1/2 -translate-x-[20%] w-24 h-24 md:w-32 md:h-32">
                          <Image src="https://placehold.co/200x200.png" width={200} height={200} alt="Team 2" className="rounded-full object-cover shadow-lg border-4 border-white" data-ai-hint="university event"/>
                    </div>

                    <div className="absolute top-1/2 -translate-y-[120%] left-10 w-20 h-20 md:w-28 md:h-28">
                        <Image src="https://placehold.co/150x150.png" width={150} height={150} alt="Team 3" className="rounded-full object-cover shadow-lg border-4 border-white" data-ai-hint="students studying"/>
                    </div>

                     <div className="absolute top-1/2 translate-y-[20%] right-10 w-20 h-20 md:w-28 md:h-28">
                          <Image src="https://placehold.co/150x150.png" width={150} height={150} alt="Team 4" className="rounded-full object-cover shadow-lg border-4 border-white" data-ai-hint="students collaborating"/>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section id="vision-mission" className="w-full py-16 md:py-24 bg-card/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className='space-y-12'>
                <div className="relative aspect-square md:hidden">
                    <Image src="https://placehold.co/600x600.png" layout="fill" objectFit="cover" alt="Visi dan Misi" className="rounded-2xl shadow-lg" data-ai-hint="team vision planning"/>
                </div>
                <div className='flex flex-col items-center md:items-start text-center md:text-left'>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-pink-100 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Eye className="w-8 h-8"/>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Visi Kami</h2>
                    </div>
                    <p className="text-muted-foreground">
                    Mewujudkan Himpunan Mahasiswa Jurusan Manajemen Informatika yang mengedepankan rasa tanggung jawab, harmoni, kebersamaan, serta menciptakan lingkungan yang inspiratif dan kolaboratif bagi seluruh Mahasiswa/i Manajemen Informatika.
                    </p>
                </div>
                 <div className="relative aspect-square hidden md:block">
                    <Image src="https://placehold.co/600x600.png" layout="fill" objectFit="cover" alt="Visi dan Misi" className="rounded-2xl shadow-lg" data-ai-hint="team vision planning"/>
                </div>
            </div>
             <div className='space-y-8'>
                <div className='flex flex-col items-center md:items-start text-center md:text-left'>
                  <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-pink-100 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                              <ListChecks className="w-8 h-8"/>
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Misi Kami</h2>
                  </div>
                </div>
                <ul className="space-y-4">
                  {missionPoints.map((mission, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-1">
                        {index + 1}
                      </div>
                      <p className="text-muted-foreground">{mission}</p>
                    </li>
                  ))}
                </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section id="our-impact" className="w-full py-16 md:py-24 bg-transparent">
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
              <Card key={index} className="text-center p-6">
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
      
       <section className="py-16 md:py-24 bg-card/40 backdrop-blur-sm">
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

      <section id="gallery" className="py-16 md:py-24 bg-transparent">
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
                      className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl cursor-pointer group"
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
