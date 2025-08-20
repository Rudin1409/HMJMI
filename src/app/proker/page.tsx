
'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, Award, Calendar, Lightbulb, Users, Mic, Briefcase, Heart, Rocket } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const mainPrograms = [
  {
    title: "IT Festival",
    icon: <Rocket className="h-8 w-8 text-primary" />,
    description: "Information Technology Festival atau yang disingkat dengan IT Festival merupakan serangkaian acara IT tahunan. Dengan rangkaian acara kompetisi, pelatihan, dan seminar sebagai ajang edukatif bagi mahasiswa maupun masyarakat umum dalam meningkatkan kreativitas dan kesadaran tentang pentingnya penggunaan teknologi informasi di era globalisasi.",
    image: "https://placehold.co/1200x600.png",
    hint: "tech festival stage competition",
  },
];

const additionalPrograms = [
  {
    title: "Seminar Bisnis",
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    description: "Kegiatan Seminar Bisnis bertujuan menambah wawasan dan pengetahuan mengenai bisnis dan berwirausaha serta memotivasi mahasiswa/i se-Indonesia dan umum untuk memulai usaha sejak dini dan siap bersaing di dunia bisnis.",
    image: "https://placehold.co/600x400.png",
    hint: "business seminar presentation",
  },
];

const communityActivities = [
  {
    title: "UPGRADING",
    description: "Pelatihan yang dikhususkan untuk kepengurusan baru Himpunan Mahasiswa Jurusan Manajemen Informatika demi meningkatkan kemampuan dalam bidang berbicara di depan umum serta menambah kemampuan di bidang desain grafis.",
    icon: <Award className="h-6 w-6 text-primary" />,
    image: 'https://placehold.co/100x100.png',
    hint: 'certificate award'
  },
  {
    title: "BAKSOMI",
    description: "Bakti sosial jurusan manajemen informatika yang didalamnya terdapat rangkaian kegiatan bermanfaat seperti bantuan sosial, kunjungan ke panti, tausiyah serta bagi-bagi takjil dijalan.",
    icon: <Heart className="h-6 w-6 text-primary" />,
    image: 'https://placehold.co/100x100.png',
    hint: 'charity donation'
  },
  {
    title: "SINTAK",
    description: "Sebuah study club yang dibentuk sebagai wadah mahasiswa/i Jurusan Manajemen Informatika untuk mengembangkan soft skill dalam pemrograman terutama di bidang web development.",
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    image: 'https://placehold.co/100x100.png',
    hint: 'coding gears'
  },
  {
    title: "POSMI",
    description: "Acara kompetisi yang menyatukan peserta dari berbagai tim, kelas, dan program studi untuk berkompetisi dalam beragam cabang olahraga dan seni khusus untuk mahasiswa/i Jurusan Manajemen Informatika.",
    icon: <Users className="h-6 w-6 text-primary" />,
    image: 'https://placehold.co/100x100.png',
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
        title: 'Gathering Mahasiswa Baru', 
        description: 'Acara penyambutan khusus untuk mahasiswa baru Jurusan Manajemen Informatika, bertujuan untuk memperkenalkan lingkungan jurusan dan organisasi.' 
    },
    { 
        title: 'Malam Keakraban HMJMI', 
        description: 'Acara tahunan yang dirancang untuk mempererat tali persaudaraan dan kebersamaan antar seluruh anggota HMJMI melalui kegiatan yang santai dan menyenangkan.' 
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
        title: 'VIBE (Voice of Informatics and Business Event)', 
        description: 'Acara yang menggabungkan seminar dan talk show inspiratif di bidang informatika dan bisnis untuk memperluas wawasan mahasiswa.' 
    },
];


export default function ProkerPage() {
  return (
    <div className="flex flex-col">
      <section 
        id="hero-proker" 
        className="relative w-full flex items-center justify-center min-h-[70vh] py-20"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="default" className="mb-4 bg-pink-100 text-primary shadow-sm">
            Aktivitas & Inisiatif
          </Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">
            Inovasi Melalui <span className="text-primary">Aksi Nyata</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
            Temukan berbagai program dan kegiatan yang kami selenggarakan untuk mengasah potensi, memperluas wawasan, dan memberikan kontribusi positif.
          </p>
        </div>
      </section>

      <section id="proker-list" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="unggulan" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto mb-10 md:mb-12 shadow-md max-w-2xl mx-auto">
              <TabsTrigger value="unggulan" className="py-2.5">Program Unggulan</TabsTrigger>
              <TabsTrigger value="pengembangan" className="py-2.5">Program Pengembangan</TabsTrigger>
              <TabsTrigger value="komunitas" className="py-2.5">Kegiatan Komunitas</TabsTrigger>
              <TabsTrigger value="agenda" className="py-2.5">Agenda Rutin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="unggulan">
              <Card className="w-full max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden border-2 border-primary/20 bg-transparent">
                {mainPrograms.map((program) => (
                    <div key={program.title} className="grid md:grid-cols-2 items-center">
                         <div className="p-8 md:p-12">
                            <Badge variant="secondary" className="mb-4">Program Kerja Utama</Badge>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{program.title}</h2>
                            <p className="text-muted-foreground mb-6">{program.description}</p>
                            <Button size="lg">
                                Lihat Info Lengkap <ArrowUpRight className="ml-2" />
                            </Button>
                        </div>
                        <div className="relative w-full h-64 md:h-full min-h-[300px]">
                             <Image src={program.image} alt={program.title} layout="fill" objectFit="cover" data-ai-hint={program.hint} />
                        </div>
                    </div>
                ))}
              </Card>
            </TabsContent>

            <TabsContent value="pengembangan">
                 <Card className="w-full max-w-5xl mx-auto shadow-xl rounded-3xl overflow-hidden bg-transparent">
                    {additionalPrograms.map((program) => (
                        <div key={program.title} className="grid md:grid-cols-2 items-center">
                            <div className="relative w-full h-64 md:h-full min-h-[300px] order-last md:order-first">
                                <Image src={program.image} alt={program.title} layout="fill" objectFit="cover" data-ai-hint={program.hint}/>
                            </div>
                            <div className="p-8 md:p-12">
                                <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">Program Kerja Tambahan</Badge>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{program.title}</h2>
                                <p className="text-muted-foreground mb-6">{program.description}</p>
                                <Button>
                                    Pelajari Lebih Lanjut <ArrowUpRight className="ml-2" />
                                </Button>
                            </div>
                        </div>
                    ))}
              </Card>
            </TabsContent>

            <TabsContent value="komunitas">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800">Aktivitas Internal & Sosial</h2>
                        <p className="text-muted-foreground mt-2">Inisiatif yang memperkuat ikatan dan mengembangkan soft skill anggota.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {communityActivities.map((activity) => (
                            <Card key={activity.title} className="bg-transparent shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
                                <CardContent className="p-6 flex items-center gap-6">
                                    <div className="relative flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border-4 border-pink-100 shadow-md">
                                        <Image src={activity.image} alt={`${activity.title} logo`} layout="fill" objectFit="cover" data-ai-hint={activity.hint} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{activity.title}</h3>
                                        <p className="text-muted-foreground text-sm">{activity.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="agenda">
                 <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800">Agenda Rutin Tahunan</h2>
                        <p className="text-muted-foreground mt-2">Kegiatan terjadwal yang menjadi bagian dari siklus organisasi kami.</p>
                    </div>
                     <Card className="bg-transparent shadow-lg rounded-2xl">
                        <CardContent className="p-6 md:p-8">
                             <Accordion type="single" collapsible className="w-full">
                                {agendas.map((agenda, index) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                                        <AccordionTrigger className="text-lg font-semibold text-gray-700 hover:no-underline">
                                            <span className='flex items-center gap-4'>
                                              <Calendar className="h-5 w-5 text-primary/80" />
                                              {agenda.title}
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground pl-10">
                                            {agenda.description}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
