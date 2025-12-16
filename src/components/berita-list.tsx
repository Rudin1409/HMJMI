
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollAnimation } from '@/components/scroll-animation';

interface BeritaAcara {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  author: string;
}

interface BeritaListProps {
    title: string;
    description: string;
    berita: BeritaAcara[] | null;
    isLoading: boolean;
}

const BeritaItemSkeleton = () => (
  <Card className="flex flex-col">
    <div className="relative w-full aspect-video">
      <Skeleton className="h-full w-full" />
    </div>
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/4 mt-2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full mt-2" />
      <Skeleton className="h-4 w-5/6 mt-2" />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-10 w-32" />
    </CardFooter>
  </Card>
);

export default function BeritaList({ title, description, berita, isLoading }: BeritaListProps) {
  return (
    <div className="flex flex-col">
      <section
        className="relative w-full flex items-center justify-center min-h-screen py-20 bg-transparent"
      >
        <div className="absolute inset-0 bg-[url('/dot-grid.svg')] bg-repeat bg-center opacity-40"></div>
        <ScrollAnimation className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="default" className="mb-4 bg-primary/10 text-primary shadow-sm">
            Kabar Terkini
          </Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground" dangerouslySetInnerHTML={{ __html: title.replace('&', '&amp;') }}></h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
            {description}
          </p>
          <div className="mt-8">
            <a href="#berita-list-content">
              <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 animate-bounce">
                <ChevronDown className="h-6 w-6" />
              </Button>
            </a>
          </div>
        </ScrollAnimation>
      </section>

      <section id="berita-list-content" className="w-full py-16 md:py-24 bg-primary/35 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading && Array.from({ length: 3 }).map((_, i) => <BeritaItemSkeleton key={i} />)}
            
            {!isLoading && berita && berita.map((item) => (
              <ScrollAnimation key={item.id}>
                <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/20">
                  <CardContent className="p-0">
                    <div className="relative w-full aspect-video">
                      <Image
                        src={item.imageUrl || '/placeholder.png'}
                        alt={item.title}
                        fill
                        className="object-cover"
                        data-ai-hint="event photo"
                      />
                    </div>
                  </CardContent>
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2">{item.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground pt-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{format(new Date(item.date), 'd MMMM yyyy', { locale: id })}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3 text-sm">{item.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="link" className="p-0 text-primary">
                      <Link href={`/berita/${item.id}`}>
                        Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          {!isLoading && (!berita || berita.length === 0) && (
            <div className="text-center col-span-full py-16">
                <h2 className="text-2xl font-semibold text-foreground">Belum Ada Postingan</h2>
                <p className="text-muted-foreground mt-2">Silakan cek kembali nanti untuk melihat pembaruan terbaru.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
