
'use client';

import Image from 'next/image';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, Award, Calendar, Lightbulb, Users, Mic, Briefcase, Heart, Rocket, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { ScrollAnimation } from '@/components/scroll-animation';

const mainPrograms = [
  {
    title: "IT Festival",
    icon: <Rocket className="h-8 w-8 text-primary" />,
    description: "Information Technology Festival atau yang disingkat dengan IT Festival merupakan serangkaian acara IT tahunan. Dengan rangkaian acara kompetisi, pelatihan, dan seminar sebagai ajang edukatif bagi mahasiswa maupun masyarakat umum dalam meningkatkan kreativitas dan kesadaran tentang pentingnya penggunaan teknologi informasi di era globalisasi.",
    image: "/Galeri/IT-fest.jpg",
    hint: "tech festival stage competition",
    link: "https://it-fest-2025-pi.vercel.app/",
  },
];

const additionalPrograms = [
  {
    title: "Seminar Bisnis",
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    description: "Kegiatan Seminar Bisnis bertujuan menambah wawasan dan pengetahuan mengenai bisnis dan berwirausaha serta memotivasi mahasiswa/i se-Indonesia dan umum untuk memulai usaha sejak dini dan siap bersaing di dunia bisnis.",
    image: "/Galeri/Sembis.jpg",
    hint: "business seminar presentation",
  },
];

const communityActivities = [
  {
    title: "UPGRADING",
    description: "Pelatihan yang dikhususkan untuk kepengurusan baru Himpunan Mahasiswa Jurusan Manajemen Informatika demi meningkatkan kemampuan dalam bidang berbicara di depan umum serta menambah kemampuan di bidang desain grafis.",
    icon: <Award className="h-6 w-6 text-primary" />,
    image: '/proker/upgrading.png',
    hint: 'certificate award'
  },
  {
    title: "BAKSOMI",
    description: "Bakti sosial jurusan manajemen informatika yang didalamnya terdapat rangkaian kegiatan bermanfaat seperti bantuan sosial, kunjungan ke panti, tausiyah serta bagi-bagi takjil dijalan.",
    icon: <Heart className="h-6 w-6 text-primary" />,
    image: '/proker/baksomiii.png',
    hint: 'charity donation'
  },
  {
    title: "SINTAK",
    description: "Sebuah study club yang dibentuk sebagai wadah mahasiswa/i Jurusan Manajemen Informatika untuk mengembangkan soft skill dalam pemrograman terutama di bidang web development.",
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    image: '/proker/sintak.png',
    hint: 'coding gears'
  },
  {
    title: "POSMI",
    description: "Acara kompetisi yang menyatukan peserta dari berbagai tim, kelas, dan program studi untuk berkompetisi dalam beragam cabang olahraga dan seni khusus untuk mahasiswa/i Jurusan Manajemen Informatika.",
    icon: <Users className="h-6 w-6 text-primary" />,
    image: '/proker/posmi2024.png',
    hint: 'sports trophy'
  },
];

const agendas = [
  {
    title: 'Sertijab & Demisioner',
    description: 'Momen serah terima jabatan dari kepengurusan lama ke kepengurusan baru, menandai awal dan akhir sebuah siklus kepemimpinan.'
  },
  {
    title: 'Open Recruitment & Gathering HMJ MI',
    description: 'Proses rekrutmen terbuka untuk menjaring anggota baru yang potensial, dilanjutkan dengan acara gathering untuk menyambut dan mengakrabkan seluruh anggota.'
  },
  {
    title: 'SIGMA',
    description: 'Acara penyambutan khusus untuk mahasiswa baru Jurusan Manajemen Informatika, bertujuan untuk memperkenalkan lingkungan jurusan dan organisasi.'
  },
  {
    title: 'Malam Keakraban HMJ MI',
    description: 'Acara tahunan yang dirancang untuk mempererat tali persaudaraan dan kebersamaan antar seluruh anggota HMJ MI melalui kegiatan yang santai dan menyenangkan.'
  },
  {
    title: 'Latihan Dasar Organisasi',
    description: 'Program pelatihan dasar bagi calon anggota untuk membekali mereka dengan pengetahuan fundamental tentang organisasi, kepemimpinan, dan manajemen.'
  },
  {
    title: 'Perpisahan Mahasiswa Semester Akhir',
    description: 'Sebuah acara apresiasi dan pelepasan bagi para senior yang telah menyelesaikan masa studinya, sebagai bentuk penghargaan atas kontribusi mereka.'
  },
  {
    title: 'VIBE (Visiting - Interacting - Building - Exchanging)',
    description: 'Sebuah program kunjungan ke organisasi mahasiswa (Ormawa) lain di lingkungan Politeknik Negeri Sriwijaya untuk mempererat silaturahmi, berinteraksi, dan saling bertukar ide serta gagasan mengenai program kerja masing-masing.'
  },
];


import { BackgroundBlobs } from '@/components/ui/background-blobs';

export default function ProkerPage() {
  return (
    <div className="flex flex-col relative overflow-hidden">
      <BackgroundBlobs className="opacity-40" />
      <section
        id="hero-proker"
        className="relative w-full flex items-center justify-center min-h-screen py-20 bg-transparent"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollAnimation direction="down">
            <Badge variant="outline" className="mb-6 border-primary/50 text-foreground bg-primary/10 px-6 py-2 text-base font-semibold rounded-full hover:scale-105 transition-transform">
              Aktivitas & Inisiatif
            </Badge>
          </ScrollAnimation>

          <ScrollAnimation delay={1}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 tracking-tight">
              Inovasi Melalui <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-600">Aksi Nyata</span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation delay={2}>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              Temukan berbagai program dan kegiatan yang kami selenggarakan untuk mengasah potensi, memperluas wawasan, dan memberikan kontribusi positif.
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

      <section id="proker-list" className="w-full py-16 md:py-24 bg-primary/40">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="unggulan" className="w-full">
            <ScrollAnimation direction="up" className="flex justify-center mb-10 md:mb-12">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-primary/10 rounded-full max-w-3xl mx-auto shadow-inner">
                <TabsTrigger value="unggulan" className="rounded-full py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">Program Unggulan</TabsTrigger>
                <TabsTrigger value="pengembangan" className="rounded-full py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">Pengembangan</TabsTrigger>
                <TabsTrigger value="komunitas" className="rounded-full py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">Komunitas</TabsTrigger>
                <TabsTrigger value="agenda" className="rounded-full py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">Agenda Rutin</TabsTrigger>
              </TabsList>
            </ScrollAnimation>

            <TabsContent value="unggulan">
              <div className="w-full max-w-5xl mx-auto relative group perspective-1000">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-blue-600 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

                <Card className="relative overflow-hidden bg-black/50 border-white/10 shadow-2xl rounded-[2.5rem]">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                  {mainPrograms.map((program) => (
                    <div key={program.title} className="flex flex-col md:grid md:grid-cols-2 items-center relative z-10">

                      <ScrollAnimation direction="left" className="p-8 md:p-12 order-2 md:order-1 space-y-8">
                        <Badge variant="secondary" className="bg-primary/20 text-white border border-primary/30 px-4 py-1.5 rounded-full">
                          Program Kerja Utama
                        </Badge>

                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
                          {program.title}
                        </h2>

                        <p className="text-slate-200 text-lg leading-relaxed font-light border-l-2 border-primary/50 pl-6 drop-shadow-md">
                          {program.description}
                        </p>

                        {program.link && (
                          <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-gradient-to-r from-primary to-purple-600 hover:scale-105 shadow-lg shadow-primary/25 transition-all duration-300 group/btn text-white border-0">
                            <Link href={program.link} target="_blank" rel="noopener noreferrer">
                              <span>Kunjungi Situs Web</span>
                              <ArrowUpRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </Link>
                          </Button>
                        )}
                      </ScrollAnimation>

                      <ScrollAnimation direction="right" className="relative w-full h-80 md:h-[550px] order-1 md:order-2 group/image overflow-hidden md:rounded-r-[2.5rem]">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 md:bg-gradient-to-l md:from-black/80 md:via-transparent md:to-transparent" />
                        <ImageWithSkeleton
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover/image:scale-110"
                          data-ai-hint={program.hint}
                          containerClassName="absolute inset-0"
                        />
                        {/* Tech Overlay */}
                        <div className="absolute inset-0 border-[3px] border-white/10 md:rounded-r-[2.5rem] pointer-events-none" />
                      </ScrollAnimation>
                    </div>
                  ))}
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pengembangan">
              <div className="w-full max-w-5xl mx-auto relative group perspective-1000">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

                <Card className="relative overflow-hidden bg-black/50 border-white/10 shadow-2xl rounded-[2.5rem]">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />

                  {additionalPrograms.map((program) => (
                    <div key={program.title} className="flex flex-col md:grid md:grid-cols-2 items-center relative z-10">
                      <ScrollAnimation direction="left" className="relative w-full h-80 md:h-[550px] order-1 md:order-first group/image overflow-hidden md:rounded-l-[2.5rem]">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 md:bg-gradient-to-r md:from-black/80 md:via-transparent md:to-transparent" />
                        <ImageWithSkeleton
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover/image:scale-110"
                          data-ai-hint={program.hint}
                          containerClassName="absolute inset-0"
                        />
                        {/* Tech Overlay */}
                        <div className="absolute inset-0 border-[3px] border-white/10 md:rounded-l-[2.5rem] pointer-events-none" />
                      </ScrollAnimation>

                      <ScrollAnimation direction="right" className="p-8 md:p-12 order-2 md:order-last space-y-8">
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-100 border border-blue-500/30 px-4 py-1.5 rounded-full">
                          Program Kerja Tambahan
                        </Badge>

                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
                          {program.title}
                        </h2>

                        <p className="text-slate-200 text-lg leading-relaxed font-light border-l-2 border-blue-500/50 pl-6 drop-shadow-md">
                          {program.description}
                        </p>
                      </ScrollAnimation>
                    </div>
                  ))}
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="komunitas">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 space-y-4">
                  <ScrollAnimation direction="down">
                    <h2 className="text-4xl md:text-5xl font-black text-foreground">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">Aktivitas Internal & Sosial</span>
                    </h2>
                  </ScrollAnimation>
                  <ScrollAnimation delay={1}>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
                      Inisiatif yang memperkuat ikatan kekeluargaan dan mengembangkan soft skill setiap anggota.
                    </p>
                  </ScrollAnimation>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {communityActivities.map((activity, index) => (
                    <ScrollAnimation key={activity.title} delay={index * 1.5} direction="up">
                      <div className="group relative h-full perspective-1000">
                        {/* Hover Glow */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-blue-600 rounded-[2rem] blur opacity-20 group-hover:opacity-60 transition-opacity duration-500" />

                        <Card className="h-full bg-black/50 border-white/10 overflow-hidden relative rounded-[2rem] hover:transform hover:scale-[1.02] transition-all duration-300 shadow-2xl">
                          {/* Glossy Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                          <CardContent className="p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 transition-transform duration-300">
                            <div className="relative shrink-0">
                              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-white/10 group-hover:border-primary/50 transition-colors duration-300 bg-black/50">
                                <Image src={activity.image} alt={activity.title} fill className="object-cover p-2" data-ai-hint={activity.hint} />
                              </div>
                            </div>

                            <div className="text-center sm:text-left space-y-3">
                              <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-400 transition-all duration-300">
                                {activity.title}
                              </h3>
                              <p className="text-slate-300 text-sm leading-relaxed font-light">
                                {activity.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="agenda">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 space-y-4">
                  <ScrollAnimation direction="down">
                    <h2 className="text-4xl md:text-5xl font-black text-foreground">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-white">Agenda Rutin Tahunan</span>
                    </h2>
                  </ScrollAnimation>
                  <ScrollAnimation delay={1}>
                    <p className="text-muted-foreground text-lg font-light">
                      Kegiatan terjadwal yang menjadi bagian dari siklus organisasi kami.
                    </p>
                  </ScrollAnimation>
                </div>

                <div className="relative group perspective-1000">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

                  <Card className="bg-black/50 border-white/10 shadow-2xl relative overflow-hidden rounded-[2.5rem]">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[30px] pointer-events-none" />

                    <CardContent className="p-8 md:p-12 relative z-10">
                      <Accordion type="single" collapsible className="w-full space-y-4">
                        {agendas.map((agenda, index) => (
                          <ScrollAnimation key={index} delay={index + 2} direction="left">
                            <AccordionItem value={`item-${index}`} className="border-none bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 px-4 group/item data-[state=open]:bg-white/10 data-[state=open]:shadow-lg">
                              <AccordionTrigger className="text-lg md:text-xl font-bold text-white hover:text-primary hover:no-underline py-6 px-2 [&[data-state=open]>span>div]:bg-primary [&[data-state=open]>span>div]:text-white">
                                <span className='flex items-center gap-6 text-left'>
                                  <div className="p-3 rounded-xl bg-white/10 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300 shadow-inner">
                                    <Calendar className="h-6 w-6" />
                                  </div>
                                  {agenda.title}
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="text-slate-300 pl-[4.5rem] pr-4 pb-6 text-base leading-relaxed font-light">
                                <div className="pt-2 border-t border-white/10">
                                  {agenda.description}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </ScrollAnimation>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div >
  );
}
