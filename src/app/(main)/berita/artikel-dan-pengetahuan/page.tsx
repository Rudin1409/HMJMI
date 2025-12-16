
'use client';

import React from 'react';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import BeritaList from '@/components/berita-list';

interface BeritaAcara {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  author: string;
}

export default function ArtikelPage() {
  const firestore = useFirestore();

  const beritaQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
        collection(firestore, 'berita_acara'), 
        where('category', '==', 'Artikel & Pengetahuan'),
        where('status', '==', 'published'),
        orderBy('date', 'desc')
    );
  }, [firestore]);

  const { data: berita, isLoading } = useCollection<BeritaAcara>(beritaQuery);

  return (
    <BeritaList
      title="Artikel & Pengetahuan"
      description="Jelajahi artikel mendalam, wawasan teknologi, dan tulisan-tulisan informatif lainnya dari komunitas kami."
      berita={berita}
      isLoading={isLoading}
    />
  );
}
