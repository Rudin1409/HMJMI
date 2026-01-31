
'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar, Code, Users, ChevronDown, Rocket, Target, Leaf, Feather, BookOpenCheck, Eye, ListChecks, Palette, Sparkles, Wind, Cpu, BrainCircuit, ChevronLeft, ChevronRight } from 'lucide-react';
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
import AutoScroll from "embla-carousel-auto-scroll"
import { AnimatedLogo } from '@/components/ui/animated-logo';
import { galleryItems, GalleryItem } from '@/data/site-data';
import { ScrollAnimation } from '@/components/scroll-animation';

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
  const plugin = useRef(
    AutoScroll({ speed: 0.5, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const missionPoints = [
    "Meningkatkan kepedulian sosial dan memperkuat nilai-nilai religius bagi Mahasiswa/i Jurusan Manajemen Informatika.",
    "Mendorong pengembangan kompetensi dan prestasi akademik serta mengelola dan menyalurkan aspirasi Mahasiswa/i Jurusan Manajemen Informatika.",
    "Menjadikan Himpunan Mahasiswa Jurusan Informatika sebagai pusat informasi melalui Media Kreatif dan penyebaran berita yang informatif bagi Mahasiswa/i Manajemen Informatika.",
    "Mewadahi serta Menyalurkan minat dan bakat di bidang non-akademik yang terdapat pada Mahasiswa/i Manajemen Informatika.",
    "Mengembangkan jiwa kewirausahaan Mahasiswa/i Jurusan Manajemen Informatika melalui pengelolaan bisnis dan layanan kemitraan."
  ];

  const handleNextImage = () => {
    if (selectedImage) {
      const currentIndex = galleryItems.findIndex(item => item.src === selectedImage.src);
      const nextIndex = (currentIndex + 1) % galleryItems.length;
      setSelectedImage(galleryItems[nextIndex]);
    }
  };

  const handlePrevImage = () => {
    if (selectedImage) {
      const currentIndex = galleryItems.findIndex(item => item.src === selectedImage.src);
      const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      setSelectedImage(galleryItems[prevIndex]);
    }
  };

  return (
    <div className="flex flex-col">
      <section
        id="hero-about"
        className="relative w-full flex items-center justify-center min-h-[90vh] overflow-hidden bg-transparent"
      >
        {/* Background Effects - Removed blue glow */}
        <div className="absolute inset-0 bg-[url('/dot-grid.svg')] bg-repeat bg-center opacity-20 dark:opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-purple-500/15 to-pink-500/15 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-16">

            {/* Text Content - Reduced Size */}
            <ScrollAnimation className="relative z-10 text-center md:text-left space-y-5">
              <Badge variant="outline" className="mb-4 border-pink-500/50 text-pink-600 dark:text-pink-300 bg-pink-500/10 backdrop-blur-md px-4 py-1.5 text-sm font-semibold rounded-full">
                Jejak Langkah Kami
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                Merangkai Inovasi, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 animate-gradient-x">
                  Mencetak Talenta
                </span>
              </h1>
              <p className="max-w-lg mx-auto md:mx-0 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Temukan bagaimana Himpunan Mahasiswa Jurusan Manajemen Informatika Politeknik Negeri Sriwijaya berkomitmen mencetak pemimpin teknologi masa depan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                <Button asChild size="lg" className="rounded-full px-6 py-5 text-base bg-gradient-to-r from-pink-600 to-purple-600 hover:scale-105 shadow-lg shadow-pink-500/20 transition-all">
                  <a href="#our-impact">Pelajari Sejarah</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6 py-5 text-base border-primary/20 bg-white/5 backdrop-blur-sm hover:bg-white/10">
                  <a href="#vision-mission">Lihat Visi Misi</a>
                </Button>
              </div>
            </ScrollAnimation>

            {/* Orbiting Visuals - Fixed Proper Orbit */}
            <ScrollAnimation className="relative flex items-center justify-center h-[450px] md:h-[500px]">

              {/* Orbit Rings */}
              <div className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] border border-white/10 rounded-full"></div>
              <div className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px] border border-white/5 rounded-full"></div>

              {/* Main Center Image */}
              <div className="relative z-20 group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <Image
                  src="/Galeri/BUKBERMI.jpg"
                  width={200}
                  height={200}
                  alt="Team Main"
                  className="rounded-full object-cover shadow-2xl border-4 border-white dark:border-white/20 relative z-10 w-36 h-36 md:w-48 md:h-48 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Orbiting Images - Positioned on the ring */}
              {/* Top */}
              <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2">
                <Image src="/Galeri/BUKBRHMJ.jpg" width={100} height={100} alt="Team 1" className="rounded-full border-2 border-white shadow-lg w-16 h-16 md:w-24 md:h-24 object-cover hover:scale-110 transition-transform cursor-pointer" />
              </div>

              {/* Bottom */}
              <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2">
                <Image src="/Galeri/Makrab.jpg" width={100} height={100} alt="Team 2" className="rounded-full border-2 border-white shadow-lg w-16 h-16 md:w-24 md:h-24 object-cover hover:scale-110 transition-transform cursor-pointer" />
              </div>

              {/* Left */}
              <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
                <Image src="/Galeri/LDOHMJMI.jpg" width={80} height={80} alt="Team 3" className="rounded-full border-2 border-white shadow-lg w-14 h-14 md:w-20 md:h-20 object-cover hover:scale-110 transition-transform cursor-pointer" />
              </div>

              {/* Right */}
              <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2">
                <Image src="/Galeri/OR.jpg" width={80} height={80} alt="Team 4" className="rounded-full border-2 border-white shadow-lg w-14 h-14 md:w-20 md:h-20 object-cover hover:scale-110 transition-transform cursor-pointer" />
              </div>

            </ScrollAnimation>
          </div>
        </div>
      </section>

      <ScrollAnimation>
        <section id="vision-mission" className="w-full py-16 md:py-24 bg-transparent relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">

              {/* Visi Card - Pink Theme */}
              <div className="relative group hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute inset-0 bg-pink-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <Card className="relative bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 overflow-hidden h-full shadow-2xl hover:shadow-pink-500/10 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-transparent rounded-bl-full pointer-events-none" />

                  <CardContent className="p-8 md:p-12 space-y-8 flex flex-col items-center md:items-start text-center md:text-left h-full">
                    <div className="relative">
                      <div className="absolute inset-0 bg-pink-500 blur-xl opacity-20 animate-pulse"></div>
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg group-hover:rotate-6 transition-transform duration-500">
                        <Eye className="w-10 h-10 text-pink-500" />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 flex flex-col items-center md:items-start gap-2">
                        Visi Kami
                        <span className="w-16 h-1.5 bg-pink-500 rounded-full" />
                      </h2>
                      <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium dark:font-light">
                        "Mewujudkan Himpunan Mahasiswa Jurusan Manajemen Informatika yang mengedepankan rasa <strong className="text-pink-600 dark:text-pink-400 font-bold dark:font-medium">tanggung jawab, harmoni, kebersamaan</strong>, serta menciptakan lingkungan yang inspiratif dan kolaboratif."
                      </p>
                    </div>

                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mt-auto group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src="/Visi.png"
                        alt="Visi HMJMI"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <p className="absolute bottom-4 left-4 text-white font-semibold text-sm">Bersama Meraih Prestasi</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Misi Card - Blue Theme */}
              <div className="relative group hover:-translate-y-2 transition-transform duration-500 delay-100">
                <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <Card className="relative bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 overflow-hidden h-full shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full pointer-events-none" />

                  <CardContent className="p-8 md:p-12 space-y-8 h-full">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse delay-75"></div>
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg group-hover:-rotate-6 transition-transform duration-500">
                          <ListChecks className="w-10 h-10 text-blue-500" />
                        </div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex flex-col items-center md:items-start gap-2">
                        Misi Kami
                        <span className="w-16 h-1.5 bg-blue-500 rounded-full" />
                      </h2>
                    </div>

                    <ul className="space-y-6 text-left">
                      {missionPoints.map((mission, index) => (
                        <li key={index} className="flex items-start gap-4 group/item">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-300 mt-0.5">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-medium dark:font-light text-base leading-relaxed group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors duration-300 pt-1 border-b border-transparent group-hover/item:border-blue-500/30 pb-4 w-full">
                            {mission}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section id="our-impact" className="w-full py-16 md:py-24 bg-transparent relative">
          {/* Decorative Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-purple-500/50 text-purple-600 dark:text-purple-300 bg-purple-500/10 backdrop-blur-md px-4 py-1.5 text-sm font-semibold rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                Dedikasi Kami
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                Capaian dan <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-gradient-x">Kontribusi Kami</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Angka-angka ini adalah cerminan dedikasi dan pertumbuhan berkelanjutan dari komunitas kami selama bertahun-tahun.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Card className="relative h-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 overflow-hidden hover:-translate-y-2 transition-transform duration-300 shadow-xl group-hover:shadow-purple-500/10">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/80 to-white/20 dark:from-white/10 dark:to-white/5 border border-white/20 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                          {stat.icon}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{stat.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{stat.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="py-16 md:py-24 bg-primary/35 backdrop-blur-sm relative overflow-hidden">
          {/* Decorative element for this section */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-purple-500/50 text-purple-600 dark:text-purple-300 bg-purple-500/10 backdrop-blur-md px-4 py-1.5 text-sm font-semibold rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                Kabinet Karsadhikara
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                Filosofi Logo <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-gradient-x">Kabinet Karsadhikara</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
                Setiap elemen dalam logo Kabinet Karsadhikara dirancang dengan makna mendalam, mencerminkan semangat, visi, dan nilai-nilai yang kami junjung tinggi.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="relative aspect-square">
                <AnimatedLogo />
              </div>
              <div className="space-y-8">
                <Card className="bg-background/80 backdrop-blur-md border-white/10 overflow-hidden group hover:border-primary/30 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Palette className="w-5 h-5 text-primary" /> Makna Warna
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {logoPhilosophy.colors.map(color => (
                        <div key={color.name} className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-white/5 hover:bg-secondary transition-colors cursor-default">
                          <div className={`w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)] ${color.class}`}></div>
                          <span className="text-xs font-medium">{color.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                      {logoPhilosophy.colors.map(color => (
                        <div key={color.name} className="flex gap-3 text-sm group/item items-start">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${color.class} shadow-[0_0_5px_currentColor] opacity-70 group-hover/item:opacity-100 transition-opacity`} />
                          <p className="text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug">
                            <span className="font-semibold text-foreground/90 block mb-0.5">{color.name}</span>
                            <span className="text-xs opacity-80">{color.description}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background/80 backdrop-blur-md border-white/10 overflow-hidden group hover:border-primary/30 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BrainCircuit className="w-5 h-5 text-primary" /> Makna Simbol
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {logoPhilosophy.symbols.map((item) => (
                      <div key={item.title} className="flex items-start gap-4 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group/symbol border border-transparent hover:border-primary/10">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover/symbol:scale-110 group-hover/symbol:bg-primary group-hover/symbol:text-primary-foreground transition-all duration-300 shadow-sm mt-1">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm group-hover/symbol:text-primary transition-colors">{item.title}</h4>
                          <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
            <Card className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-md border-primary/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3" />
              <CardHeader className="text-center relative z-10 pb-2">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  Filosofi Utama
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-center text-muted-foreground text-lg italic leading-relaxed max-w-2xl mx-auto">"{logoPhilosophy.overall}"</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </ScrollAnimation>

      <div className="w-full overflow-hidden">
        <ScrollAnimation>
          <section id="gallery" className="py-16 md:py-24 bg-transparent relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-pink-500/50 text-pink-600 dark:text-pink-300 bg-pink-500/10 backdrop-blur-md px-4 py-1.5 text-sm font-semibold rounded-full shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                  Galeri Kegiatan
                </Badge>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                  Momen <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 animate-gradient-x">Dalam Lensa</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
                  Saksikan dokumentasi berbagai momen tak terlupakan yang menangkap semangat, kolaborasi, dan pencapaian kami.
                </p>
              </div>
              <Carousel
                plugins={[plugin.current]}
                opts={{
                  align: "start",
                  loop: true,
                  dragFree: true, // Smoother scrolling feel
                }}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="-ml-4">
                  {galleryItems.map((item, index) => (
                    <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <div className="p-1 h-full">
                        <div
                          className="relative aspect-[3/4] overflow-hidden rounded-3xl cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500"
                          onClick={() => setSelectedImage(item)}
                        >
                          {/* Image with Zoom Effect */}
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            data-ai-hint={item.hint}
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />

                          {/* Refined Bottom Gradient Overlay - Only distinct at bottom for text */}
                          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-500" />

                          {/* Floating Year Badge */}
                          <div className="absolute top-4 right-4 z-20 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <Badge className="bg-black/40 backdrop-blur-md border-white/20 text-white hover:bg-black/60">
                              {item.year}
                            </Badge>
                          </div>

                          {/* Content Overlay - Cleaner, no heavy box */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full z-20">
                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                              <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg group-hover:text-primary transition-colors duration-300 transform origin-left">
                                {item.title}
                              </h3>
                              <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-in-out">
                                <p className="text-white/80 text-xs leading-relaxed drop-shadow-md pb-2">
                                  Sebuah momen berharga yang mengabadikan semangat kebersamaan dan dedikasi kami.
                                </p>
                              </div>
                              <div className="w-0 group-hover:w-12 h-1 bg-primary rounded-full transition-all duration-500 delay-100" />
                            </div>
                          </div>

                          {/* Subtle Shine Effect on Hover */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-primary border-none text-white h-12 w-12 rounded-full backdrop-blur-md transition-all duration-300" />
                <CarouselNext className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-primary border-none text-white h-12 w-12 rounded-full backdrop-blur-md transition-all duration-300" />
              </Carousel>
            </div>
          </section>
        </ScrollAnimation>
      </div>

      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0">
            <div className="relative aspect-video">
              <Image src={selectedImage.src} alt={selectedImage.title} fill className="object-contain" data-ai-hint={selectedImage.hint} />
              <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/75" onClick={handlePrevImage}>
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/75" onClick={handleNextImage}>
                <ChevronRight className="h-6 w-6" />
              </Button>
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
