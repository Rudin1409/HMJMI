
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

export default function BeritaHmjPage() {
  const firestore = useFirestore();

  const beritaQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
        collection(firestore, 'berita_acara'), 
        where('category', '==', 'Berita HMJ'),
        where('status', '==', 'published'),
        orderBy('date', 'desc')
    );
  }, [firestore]);

  const { data: berita, isLoading } = useCollection<BeritaAcara>(beritaQuery);

  return (
    <BeritaList
      title="Berita HMJ"
      description="Ikuti perkembangan terbaru, pengumuman penting, dan liputan acara dari Himpunan Mahasiswa Jurusan Manajemen Informatika."
      berita={berita}
      isLoading={isLoading}
    />
  );
}
