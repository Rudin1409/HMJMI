'use client';

import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { ScrollAnimation } from '@/components/scroll-animation';
import BeritaList from '@/components/berita-list';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';

interface BeritaAcara {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  author: string;
  category: 'Berita HMJ' | 'Artikel & Pengetahuan';
  status: 'published' | 'draft';
}

export default function BeritaPage() {
  const firestore = useFirestore();

  const beritaQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'berita_acara'),
      where('status', '==', 'published'),
      orderBy('date', 'desc')
    );
  }, [firestore]);

  const { data: allBerita, isLoading } = useCollection<BeritaAcara>(beritaQuery);

  const beritaHmj = useMemo(() => {
    if (!allBerita) return null;
    return allBerita.filter(item => item.category === 'Berita HMJ');
  }, [allBerita]);

  const artikel = useMemo(() => {
    if (!allBerita) return null;
    return allBerita.filter(item => item.category === 'Artikel & Pengetahuan');
  }, [allBerita]);

  return (
    <div className="flex flex-col">
      <section className="relative w-full flex items-center justify-center min-h-screen py-20 bg-transparent">
        <div className="absolute inset-0 bg-[url('/dot-grid.svg')] bg-repeat bg-center opacity-40"></div>
        <ScrollAnimation className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="default" className="mb-4 bg-primary/10 text-primary shadow-sm">
            Kabar Terkini
          </Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">Pusat Informasi & Wawasan</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
            Jelajahi berita terbaru seputar kegiatan HMJ, artikel mendalam, dan wawasan teknologi dari komunitas kami.
          </p>
          <div className="mt-8">
            <a href="#berita-content">
              <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 animate-bounce">
                <ChevronDown className="h-6 w-6" />
              </Button>
            </a>
          </div>
        </ScrollAnimation>
      </section>

      <section id="berita-content" className="w-full py-16 md:py-24 bg-primary/35 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="hmj" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-auto shadow-md">
              <TabsTrigger value="hmj" className="py-2.5">Berita HMJ</TabsTrigger>
              <TabsTrigger value="artikel" className="py-2.5">Artikel & Pengetahuan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hmj" className="mt-8">
              <BeritaList
                berita={beritaHmj}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="artikel" className="mt-8">
              <BeritaList
                berita={artikel}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
