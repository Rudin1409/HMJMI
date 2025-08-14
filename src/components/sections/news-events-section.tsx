import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays } from 'lucide-react';

const newsItems = [
  {
    imgSrc: 'https://placehold.co/600x400',
    hint: 'students in a competition',
    title: 'Delegasi HMIF Unsri Raih Juara 2 di Ajang Gemastik',
    date: '15 Agu 2024',
    excerpt: 'Tim dari HMIF Unsri berhasil membawa pulang medali perak dalam kategori pengembangan perangkat lunak.',
  },
  {
    imgSrc: 'https://placehold.co/600x401',
    hint: 'people listening to a seminar',
    title: 'Sukses Gelar Seminar Nasional "AI for Everyone"',
    date: '10 Agu 2024',
    excerpt: 'Seminar ini dihadiri oleh ratusan peserta dari berbagai kalangan untuk membahas masa depan AI.',
  },
  {
    imgSrc: 'https://placehold.co/600x402',
    hint: 'students in a workshop',
    title: 'Workshop Cybersecurity: Menjaga Keamanan di Era Digital',
    date: '01 Agu 2024',
    excerpt: 'HMIF berkolaborasi dengan ahli keamanan siber untuk memberikan pelatihan intensif kepada mahasiswa.',
  },
];


export function NewsEventsSection() {
  return (
    <section id="berita" className="w-full bg-background py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-montserrat text-3xl font-extrabold uppercase tracking-tighter sm:text-4xl md:text-5xl">
            Berita <span className="text-primary">Terbaru</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Ikuti terus informasi dan kegiatan terbaru dari HMIF Unsri.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, index) => (
            <Card key={index} className="group flex flex-col overflow-hidden border-border/40 bg-secondary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
              <CardHeader className="p-0">
                <div className="relative h-56 w-full">
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
              <CardContent className="flex flex-grow flex-col p-6">
                 <div className="mb-2 flex items-center space-x-2 text-sm text-muted-foreground">
                   <CalendarDays className="h-4 w-4" />
                   <span>{item.date}</span>
                 </div>
                <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary">{item.title}</CardTitle>
                <p className="mt-2 flex-grow text-sm text-muted-foreground">{item.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="link" asChild className="p-0 text-primary">
                  <Link href="#">
                    Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
