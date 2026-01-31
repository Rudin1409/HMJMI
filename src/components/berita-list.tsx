'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollAnimation } from '@/components/scroll-animation';

interface BeritaAcara {
  id: string;
  title: string;
  content: string;
  date: any; // Changed from string to any to handle Firestore Timestamp
  imageUrl: string;
  author: string;
}

interface BeritaListProps {
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

const formatDate = (date: any) => {
  if (!date) return '';
  try {
    if (date.toDate) return format(date.toDate(), 'd MMMM yyyy', { locale: id });
    if (date instanceof Date) return format(date, 'd MMMM yyyy', { locale: id });
    return format(new Date(date), 'd MMMM yyyy', { locale: id });
  } catch (e) {
    return 'Invalid Date';
  }
};

export default function BeritaList({ berita, isLoading }: BeritaListProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {isLoading && Array.from({ length: 3 }).map((_, i) => <BeritaItemSkeleton key={i} />)}

      {!isLoading && berita && berita.length > 0 ? (
        berita.map((item) => (
          <ScrollAnimation key={item.id}>
            <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] hover:border-primary/50 bg-background/90 backdrop-blur-sm border-white/20 group">
              <CardContent className="p-0">
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={item.imageUrl || '/placeholder.png'}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint="event photo"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">Baca Sekarang</Badge>
                  </div>
                </div>
              </CardContent>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">{item.title}</CardTitle>
                <div className="flex items-center text-xs text-muted-foreground pt-2 gap-2">
                  <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full text-primary">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pb-4">
                <div className="text-muted-foreground line-clamp-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content }} />
              </CardContent>
              <CardFooter className="pt-0">
                <Button asChild variant="ghost" size="sm" className="rounded-full px-4 h-8 text-xs bg-primary/5 hover:bg-primary hover:text-primary-foreground w-full justify-between group/btn">
                  <Link href={`/berita/read?id=${item.id}`}>
                    Baca Selengkapnya <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </ScrollAnimation>
        ))
      ) : null}

      {!isLoading && (!berita || berita.length === 0) && (
        <div className="text-center col-span-full py-16">
          <h2 className="text-2xl font-semibold text-foreground">Belum Ada Postingan</h2>
          <p className="text-muted-foreground mt-2">Silakan cek kembali nanti untuk melihat pembaruan terbaru.</p>
        </div>
      )}
    </div>
  );
}
