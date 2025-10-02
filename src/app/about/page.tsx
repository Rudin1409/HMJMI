
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar, Code, Users, ChevronDown, Rocket, Target, Leaf, Feather, BookOpenCheck, Eye, ListChecks, Palette, Sparkles, Wind, Cpu, BrainCircuit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AnimatedLogo } from '@/components/ui/animated-logo';
import { aboutHeroImages, galleryItems, GalleryItem } from '@/data/site-data';

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

const logoPhilosophy = {
    colors: [
        { name: "Merah & Oranye", description: "Melambangkan keberanian dan semangat.", class: "bg-red-500" },
        { name: "Emas & Kuning", description: "Melambangkan keunggulan dan kepemimpinan.", class: "bg-yellow-500" },
        { name: "Putih", description: "Melambangkan kedamaian dan netral.", class: "bg-white border border-gray-300" },
        { name: "Biru", description: "Melambangkan kebijaksanaan dan ketenangan.", class: "bg-blue-500" },
        { name: "Pink", description: "Melambangkan kelembutan dan perubahan yang positif.", class: "bg-pink-500" },
        { name: "Abu-abu", description: "Melambangkan kebijaksanaan dan kedewasaan.", class: "bg-gray-500" },
    ],
    symbols: [
        { 
            icon: <Feather className="w-6 h-6 text-primary" />,
            title: "Ekor di Bawah", 
            description: "Melambangkan 5 divisi dengan warna merah dan oranye, merepresentasikan energi, semangat juang, keberanian menyuarakan aspirasi, dan peran aktif dalam memperjuangkan kepentingan jurusan." 
        },
        { 
            icon: <Wind className="w-6 h-6 text-primary" />,
            title: "Sayap Terbentang", 
            description: "Melambangkan 11 divisi dan kesiapan untuk terbang tinggi, menjangkau luas, dan menyebarkan pengaruh positif sebagai wadah aspirasi, ide, dan semangat kolaboratif." 
        },
        { 
            icon: <Sparkles className="w-6 h-6 text-primary" />,
            title: "Hiasan Biru di Atas Kepala", 
            description: "Melambangkan sikap berkepala dingin dan ketenangan dalam menghadapi setiap masalah, baik di dalam maupun di luar himpunan." 
        },
        { 
            icon: <Cpu className="w-6 h-6 text-primary" />,
            title: "Elemen IT di Dada Phoenix", 
            description: "Pola sirkuit motherboard yang menjadi inti dari Jurusan Manajemen Informatika, mencerminkan inovasi, teknologi, serta peran utama dalam dunia digital." 
        },
    ],
    overall: "Secara keseluruhan, logo ini mencerminkan semangat kebangkitan, adaptasi, dan inovasi dalam bidang teknologi dan manajemen organisasi, menjadikan Himpunan Mahasiswa Manajemen Informatika sebagai entitas yang selalu berkembang dan siap menghadapi tantangan zaman."
};

export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const missionPoints = [
    "Meningkatkan kepedulian sosial dan memperkuat nilai-nilai religius bagi Mahasiswa/i Jurusan Manajemen Informatika.",
    "Mendorong pengembangan kompetensi dan prestasi akademik serta mengelola dan menyalurkan aspirasi Mahasiswa/i Jurusan Manajemen Informatika.",
    "Menjadikan Himpunan Mahasiswa Jurusan Informatika sebagai pusat informasi melalui Media Kreatif dan penyebaran berita yang informatif bagi Mahasiswa/i Manajemen Informatika.",
    "Mewadahi serta Menyalurkan minat dan bakat di bidang non-akademik yang terdapat pada Mahasiswa/i Manajemen Informatika.",
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
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                 <div className="relative z-10 text-center md:text-left">
                    <Badge variant="default" className="mb-4 bg-primary/10 text-primary">
                      Jejak Langkah Kami
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                      Merangkai Inovasi, <span className="text-primary">Mencetak Talenta</span>
                    </h1>
                    <p className="mt-4 max-w-md mx-auto md:mx-0 text-lg text-muted-foreground">
                      Temukan bagaimana Himpunan Mahasiswa Jurusan Manajemen Informatika Politeknik Negeri Sriwijaya berkomitmen mencetak pemimpin teknologi masa depan.
                    </p>
                </div>
                <div className="relative flex items-center justify-center h-[500px] md:h-auto md:aspect-square">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full shadow-inner"></div>
                    </div>
                    
                    <Image src="https://placehold.co/300x300.png" width={300} height={300} alt="Team Main" data-ai-hint="team leader" className="rounded-full object-cover shadow-lg border-4 border-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-52 md:h-52 z-10" />
                    <Image src="https://placehold.co/200x200.png" width={200} height={200} alt="Team 1" data-ai-hint="student group" className="rounded-full object-cover shadow-lg border-4 border-white absolute top-8 left-1/2 -translate-x-[80%] w-24 h-24 md:w-32 md:h-32" />
                    <Image src="https://placehold.co/200x200.png" width={200} height={200} alt="Team 2" data-ai-hint="university event" className="rounded-full object-cover shadow-lg border-4 border-white absolute bottom-8 left-1/2 -translate-x-[20%] w-24 h-24 md:w-32 md:h-32" />
                    <Image src="https://placehold.co/150x150.png" width={150} height={150} alt="Team 3" data-ai-hint="students studying" className="rounded-full object-cover shadow-lg border-4 border-white absolute top-1/2 -translate-y-[120%] left-10 w-20 h-20 md:w-28 md:h-28" />
                    <Image src="https://placehold.co/150x150.png" width={150} height={150} alt="Team 4" data-ai-hint="students collaborating" className="rounded-full object-cover shadow-lg border-4 border-white absolute top-1/2 translate-y-[20%] right-10 w-20 h-20 md:w-28 md:h-28" />
                </div>
            </div>
        </div>
      </section>

      <section id="vision-mission" className="w-full py-16 md:py-24 bg-primary/35 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className='space-y-12'>
                <div className="relative aspect-square md:hidden">
                    <Image src="https://placehold.co/450x450.png" layout="fill" objectFit="cover" alt="Visi dan Misi" className="rounded-2xl shadow-lg" data-ai-hint="team vision planning"/>
                </div>
                <div className='flex flex-col items-center md:items-start text-center md:text-left'>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Eye className="w-8 h-8"/>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Visi Kami</h2>
                    </div>
                    <p className="text-muted-foreground">
                    Mewujudkan Himpunan Mahasiswa Jurusan Manajemen Informatika yang mengedepankan rasa tanggung jawab, harmoni, kebersamaan, serta menciptakan lingkungan yang inspiratif dan kolaboratif bagi seluruh Mahasiswa/i Manajemen Informatika.
                    </p>
                </div>
                 <div className="relative aspect-square hidden md:block">
                    <Image src="https://placehold.co/450x450.png" layout="fill" objectFit="cover" alt="Visi dan Misi" className="rounded-2xl shadow-lg" data-ai-hint="team vision planning"/>
                </div>
            </div>
             <div className='space-y-8'>
                <div className='flex flex-col items-center md:items-start text-center md:text-left'>
                  <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                              <ListChecks className="w-8 h-8"/>
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Misi Kami</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
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
                  <div className="bg-primary/10 p-4 rounded-full">
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
      
       <section className="py-16 md:py-24 bg-primary/35 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <Badge variant="default" className="mb-4 bg-primary/10 text-primary">
                      Kabinet Karsadhikara
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Filosofi Logo <span className="text-primary">Kabinet Karsadhikara</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
                        Setiap elemen dalam logo Kabinet Karsadhikara dirancang dengan makna mendalam, mencerminkan semangat, visi, dan nilai-nilai yang kami junjung tinggi.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <div className="relative aspect-square">
                        <AnimatedLogo />
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2"><Palette className="w-5 h-5 text-primary"/> Makna Warna</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {logoPhilosophy.colors.map(color => (
                                    <div key={color.name} className="flex items-center gap-2">
                                        <div className={`w-4 h-4 rounded-full flex-shrink-0 ${color.class}`}></div>
                                        <span className="text-sm text-muted-foreground">{color.name}</span>
                                    </div>
                                ))}
                            </div>
                             <div className="mt-4 space-y-2">
                                {logoPhilosophy.colors.map(color => (
                                    <p key={color.name} className="text-sm text-muted-foreground pl-6 relative">
                                        <span className={`absolute left-0 top-1.5 w-4 h-4 rounded-full ${color.class}`}></span>
                                        <strong>{color.name}:</strong> {color.description}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-primary"/> Makna Simbol</h3>
                             <div className="space-y-4">
                               {logoPhilosophy.symbols.map((item) => (
                                    <div key={item.title} className="flex items-start gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{item.title}</h4>
                                            <p className="text-muted-foreground text-sm">{item.description}</p>
                                        </div>
                                    </div>
                               ))}
                            </div>
                        </div>
                    </div>
                </div>
                 <Card className="mt-12 max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-center">Arti Keseluruhan Logo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-muted-foreground">{logoPhilosophy.overall}</p>
                    </CardContent>
                </Card>
            </div>
      </section>

      <section id="gallery" className="py-16 md:py-24 bg-transparent">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-1 bg-primary rounded-full"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Momen <span className="text-primary">Dalam Lensa</span>
                </h2>
                <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
                    Saksikan dokumentasi berbagai momen tak terlupakan yang menangkap semangat, kolaborasi, dan pencapaian kami.
                </p>
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {galleryItems.map((item, index) => (
                        <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/4 p-3">
                            <Card 
                                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl cursor-pointer group h-full"
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
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12" />
            </Carousel>
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
