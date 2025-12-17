'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar, ChevronLeft, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/scroll-animation';
import { BlogSidebar } from '@/components/blog-sidebar';
import { CommentSection } from '@/components/comment-section';
import { LikeButton } from '@/components/like-button';

interface BeritaAcara {
    id: string;
    title: string;
    content: string;
    date: any;
    imageUrl: string;
    author: string;
    category: string;
    likes?: number;
}

const formatDate = (date: any) => {
    if (!date) return '';
    try {
        if (date.toDate) return format(date.toDate(), 'd MMMM yyyy', { locale: id });
        if (date instanceof Date) return format(date, 'd MMMM yyyy', { locale: id });
        return format(new Date(date), 'd MMMM yyyy', { locale: id });
    } catch (e) {
        return '';
    }
};

const DetailBeritaSkeleton = () => (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-12 w-full" />
                <div className="flex gap-4">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="h-[400px] w-full rounded-xl" />
                <div className="space-y-4 pt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </div>
            <div className="lg:col-span-4">
                <Skeleton className="h-[600px] w-full" />
            </div>
        </div>
    </div>
);

function BeritaContent() {
    const firestore = useFirestore();
    const searchParams = useSearchParams();
    const beritaId = searchParams.get('id');

    const beritaRef = useMemoFirebase(() => {
        if (!firestore || !beritaId) return null;
        return doc(firestore, 'berita_acara', beritaId);
    }, [firestore, beritaId]);

    const { data: berita, isLoading } = useDoc<BeritaAcara>(beritaRef);

    if (isLoading) {
        return <DetailBeritaSkeleton />;
    }

    if (!berita || !beritaId) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-3xl font-bold text-destructive">Berita Tidak Ditemukan</h1>
                <p className="text-muted-foreground mt-4">Berita yang Anda cari tidak ada atau judul tautan salah.</p>
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
        <article className="min-h-screen bg-background/50 backdrop-blur-sm">
            <ScrollAnimation>
                <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
                    {/* Top Navigation */}
                    <div className="mb-8">
                        <Button asChild variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
                            <Link href="/berita" className="flex items-center text-muted-foreground transition-colors">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Kembali ke Berita
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content Area */}
                        <div className="lg:col-span-8">
                            {/* Header Section */}
                            <header className="mb-8">
                                <div className="flex items-center gap-3 mb-4 text-sm">
                                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0 rounded-full px-4 py-1">
                                        {berita.category}
                                    </Badge>
                                    <span className="text-muted-foreground flex items-center">
                                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                        {formatDate(berita.date)}
                                    </span>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                                    <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight flex-1">
                                        {berita.title}
                                    </h1>
                                    <div className="shrink-0 md:mt-2">
                                        <LikeButton postId={beritaId} initialLikes={berita.likes} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {berita.author.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Oleh <span className="text-primary">{berita.author}</span></p>
                                        <p className="text-xs text-muted-foreground">Admin HMJ</p>
                                    </div>
                                </div>
                            </header>

                            {/* Featured Image */}
                            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl mb-10 border border-border/50">
                                <Image
                                    src={berita.imageUrl || '/placeholder.png'}
                                    alt={berita.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    data-ai-hint="event highlight"
                                />
                            </div>

                            {/* Content Body */}
                            <div
                                className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-foreground prose-a:text-primary prose-img:rounded-xl"
                                dangerouslySetInnerHTML={{ __html: berita.content }}
                            />

                            {/* Comment Section */}
                            <CommentSection postId={beritaId} articleTitle={berita.title} />
                        </div>

                        {/* Sidebar Area */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-24">
                                <BlogSidebar
                                    authorName={berita.author}
                                    category={berita.category}
                                    currentPostId={beritaId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollAnimation>
        </article>
    );
}

export default function BeritaDetailWrapper() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
            <BeritaContent />
        </Suspense>
    );
}
