'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white p-6 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
        <div className="relative w-24 h-24 bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-3xl flex items-center justify-center">
          <FileQuestion className="h-12 w-12 text-primary" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
        Halaman Tidak Ditemukan (404)
      </h1>
      <p className="text-muted-foreground text-lg max-w-md mb-8 leading-relaxed">
        Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
      </p>
      <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/20 hover:scale-105 transition-transform gap-2">
        <Link href="/">
          <Home className="h-5 w-5" /> Kembali ke Beranda
        </Link>
      </Button>
    </div>
  );
}
