
'use client';

import React from 'react';
import Image from 'next/image';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar, User, Tag, ChevronLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/scroll-animation';

interface BeritaAcara {
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  author: string;
  divisionId?: string;
  category: string;
}

const DetailBeritaSkeleton = () => (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <Skeleton className="h-10 w-3/4 mx-auto" />
        <div className="flex justify-center items-center gap-6 mt-6">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
        </div>
        <div className="relative aspect-video w-full mt-8 rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
        <div className="mt-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full mt-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    </div>
);


export default function BeritaDetailPage() {
  const firestore = useFirestore();
  const params = useParams();
  const { id: beritaId } = params;

  const beritaRef = useMemoFirebase(() => {
    if (!firestore || !beritaId) return null;
    return doc(firestore, 'berita_acara', Array.isArray(beritaId) ? beritaId[0] : beritaId);
  }, [firestore, beritaId]);

  const { data: berita, isLoading } = useDoc<BeritaAcara>(beritaRef);

  if (isLoading) {
    return <DetailBeritaSkeleton />;
  }

  if (!berita) {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
            <h1 className="text-3xl font-bold text-destructive">Berita Tidak Ditemukan</h1>
            <p className="text-muted-foreground mt-4">Berita yang Anda cari tidak ada atau mungkin telah dihapus.</p>
            <Button asChild className="mt-8">
                <Link href="/berita">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Kembali ke Daftar Berita
                </Link>
            </Button>
        </div>
    );
  }

  return (
    <article className="bg-primary/5">
        <ScrollAnimation>
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
            <header className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">{berita.category}</Badge>
                <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
                    {berita.title}
                </h1>
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-6 text-muted-foreground">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        <span>{format(new Date(berita.date), 'EEEE, d MMMM yyyy', { locale: id })}</span>
                    </div>
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-primary" />
                        <span>{berita.author}</span>
                    </div>
                    {berita.divisionId && (
                        <div className="flex items-center">
                             <Tag className="w-4 h-4 mr-2 text-primary" />
                             <Badge variant="outline">{berita.divisionId}</Badge>
                        </div>
                    )}
                </div>
            </header>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg mb-12">
                <Image
                src={berita.imageUrl || '/placeholder.png'}
                alt={berita.title}
                fill
                className="object-cover"
                data-ai-hint="event highlight"
                />
            </div>

            <div
                className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90 prose-p:leading-relaxed prose-headings:text-foreground prose-strong:text-foreground prose-ul:list-disc prose-ol:list-decimal"
                dangerouslySetInnerHTML={{ __html: berita.content }}
            />

            <div className="text-center mt-16">
                 <Button asChild variant="outline">
                    <Link href="/berita/hmj">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Kembali ke Semua Berita
                    </Link>
                </Button>
            </div>
        </div>
        </ScrollAnimation>
    </article>
  );
}
