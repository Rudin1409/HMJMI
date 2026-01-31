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
      where('status', '==', 'published')
      // orderBy('date', 'desc')
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
      <section className="relative w-full flex items-center justify-center min-h-screen py-20 bg-transparent overflow-hidden">
        <ScrollAnimation className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-6 border-primary/50 text-white bg-primary/10 backdrop-blur-md px-6 py-2 text-base font-semibold rounded-full shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 transition-transform">
            Kabar Terkini
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 tracking-tight">
            Pusat Informasi & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-600 animate-gradient-x">Wawasan</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            Jelajahi berita terbaru seputar kegiatan HMJ, artikel mendalam, dan wawasan teknologi dari komunitas kami.
          </p>
          <div className="mt-12">
            <a href="#berita-content">
              <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-primary/20 bg-background/50 text-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary backdrop-blur-sm animate-bounce shadow-lg transition-all duration-300">
                <ChevronDown className="h-6 w-6" />
              </Button>
            </a>
          </div>
        </ScrollAnimation>
      </section>

      <section id="berita-content" className="w-full py-16 md:py-24 bg-primary/35 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="hmj" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-auto p-1 bg-primary/10 rounded-full shadow-inner">
                <TabsTrigger value="hmj" className="rounded-full py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">Berita HMJ</TabsTrigger>
                <TabsTrigger value="artikel" className="rounded-full py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">Artikel & Pengetahuan</TabsTrigger>
              </TabsList>
            </div>

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
