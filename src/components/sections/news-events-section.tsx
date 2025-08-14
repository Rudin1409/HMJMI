import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const newsItems = [
  {
    imgSrc: 'https://placehold.co/600x400',
    hint: 'technology workshop students',
    title: 'Workshop Web Development Bersama Praktisi Industri',
    date: '15 Agu 2024',
    excerpt: 'Tingkatkan skill web development kamu dengan belajar langsung dari para ahli di bidangnya.',
  },
  {
    imgSrc: 'https://placehold.co/600x401',
    hint: 'student competition award',
    title: 'HMJMI Raih Juara 1 Lomba Competitive Programming Nasional',
    date: '10 Agu 2024',
    excerpt: 'Tim dari HMJMI berhasil mengharumkan nama Polsri di kancah nasional.',
  },
  {
    imgSrc: 'https://placehold.co/600x402',
    hint: 'community service event',
    title: 'Bakti Sosial dan Pengabdian Masyarakat di Desa Sukamaju',
    date: '01 Agu 2024',
    excerpt: 'Wujud kepedulian HMJMI kepada masyarakat sekitar melalui kegiatan sosial.',
  },
];

const events = [
    { name: 'Rapat Akbar Awal Periode', date: '25 Agu 2024', time: '09:00 WIB' },
    { name: 'Seminar Nasional "AI for Future"', date: '05 Sep 2024', time: '13:00 WIB' },
    { name: 'Pelatihan Desain Grafis untuk Pemula', date: '12 Sep 2024', time: '10:00 WIB' },
];

export function NewsEventsSection() {
  return (
    <section id="berita" className="w-full bg-secondary py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Berita & Kegiatan
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Ikuti terus informasi terbaru dan agenda kegiatan dari HMJMI.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-2xl font-bold">Berita Terbaru</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {newsItems.map((item, index) => (
                <Card key={index} className="group overflow-hidden transition-all duration-300 hover:shadow-xl bg-background">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={item.imgSrc}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={item.hint}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="mb-2 text-sm text-muted-foreground">{item.date}</p>
                    <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground">{item.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="link" asChild className="p-0 text-accent">
                      <Link href="#">
                        Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="mb-6 text-2xl font-bold">Agenda Terdekat</h3>
            <Card className="bg-background">
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {events.map((event, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 rounded-md bg-accent p-3 text-accent-foreground">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">{event.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <p>{event.date}</p>
                          <span className="text-xs">•</span>
                          <div className="flex items-center space-x-1">
                             <Clock className="h-3 w-3" />
                             <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
