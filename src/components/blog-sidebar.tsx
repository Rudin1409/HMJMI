'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Github, Linkedin, Calendar, User, Youtube, Music, Video } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit, orderBy } from 'firebase/firestore';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface BlogSidebarProps {
    authorName: string;
    category: string;
    currentPostId: string;
}

// Helper for date formatting
const formatDate = (date: any) => {
    if (!date) return '';
    try {
        if (date.toDate) return format(date.toDate(), 'd MMM yyyy', { locale: id });
        if (date instanceof Date) return format(date, 'd MMM yyyy', { locale: id });
        return format(new Date(date), 'd MMM yyyy', { locale: id });
    } catch (e) {
        return '';
    }
};

export function BlogSidebar({ authorName, category, currentPostId }: BlogSidebarProps) {
    const firestore = useFirestore();

    // Query for Related Posts
    const relatedQuery = useMemoFirebase(() => {
        if (!firestore || !category) return null;
        return query(
            collection(firestore, 'berita_acara'),
            // where('status', '==', 'published'),
            // Note: Ideally we filter by category here, but compound queries need indexes.
            // We will client-side filter for simplicity if index is missing, 
            // or assuming user has "published" index.
            // Let's try simple query first to avoid index errors, or just sort by date
            orderBy('date', 'desc')
            // limit(5)
        );
    }, [firestore, category]);

    const { data: allPosts } = useCollection<any>(relatedQuery);

    // Client-side filtering to exclude current post and match category (if query was broader)
    const relatedPosts = allPosts
        ?.filter(p => p.id !== currentPostId && p.category === category)
        .slice(0, 3); // Take top 3

    return (
        <div className="space-y-8">
            {/* 1. About Author */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 overflow-hidden">
                <CardHeader className="bg-primary/5 pb-4">
                    <CardTitle className="text-lg font-bold">Tentang Penulis</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4 border-2 border-primary shadow-lg ring-4 ring-primary/10">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${authorName}&background=random`} />
                        <AvatarFallback>{authorName.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                        {authorName}
                    </h3>
                    <p className="text-sm text-primary mb-3 font-medium">Kontributor Ahli</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {authorName} adalah bagian dari tim penulis HMJ MI yang berdedikasi membagikan wawasan teknologi dan kegiatan kampus.
                    </p>
                </CardContent>
            </Card>

            {/* 2. Related Posts */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 overflow-hidden">
                <CardHeader className="bg-primary/5 pb-4">
                    <CardTitle className="text-lg font-bold">Lainnya di Kategori Ini</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    {relatedPosts && relatedPosts.length > 0 ? (
                        relatedPosts.map((post) => (
                            <Link href={`/berita/read?id=${post.id}`} key={post.id} className="flex gap-4 group">
                                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-border group-hover:border-primary transition-colors">
                                    <Image
                                        src={post.imageUrl || '/placeholder.png'}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h4>
                                    <span className="text-xs text-muted-foreground mt-1 flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {formatDate(post.date)}
                                    </span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground italic">Belum ada berita terkait.</p>
                    )}
                </CardContent>
            </Card>

            {/* 3. Follow Us */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 overflow-hidden">
                <CardHeader className="bg-primary/5 pb-4">
                    <CardTitle className="text-lg font-bold">Ikuti Kami</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 gap-3">
                    <Link href="https://www.instagram.com/hmjmi_polsri" target="_blank">
                        <Button variant="outline" className="w-full justify-between bg-gradient-to-r from-orange-500/10 to-pink-500/10 hover:from-orange-500/20 hover:to-pink-500/20 border-pink-500/20 text-pink-600 dark:text-pink-400 h-12">
                            <div className="flex items-center"><Instagram className="mr-2 h-5 w-5" /> Instagram</div>
                            <span className="text-xs font-medium">hmjmi_polsri</span>
                        </Button>
                    </Link>
                    <Link href="https://www.tiktok.com/@hmjmi_polsri" target="_blank">
                        <Button variant="outline" className="w-full justify-between bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 border-foreground/20 text-foreground h-12">
                            <div className="flex items-center"><Video className="mr-2 h-5 w-5" /> TikTok</div>
                            <span className="text-xs font-medium">@hmjmi_polsri</span>
                        </Button>
                    </Link>
                    <Link href="https://open.spotify.com/show/20nUuu1qtiEPngiZWbsJDX?si=921b5db4b2334bb6" target="_blank">
                        <Button variant="outline" className="w-full justify-between bg-green-500/10 hover:bg-green-500/20 border-green-500/20 text-green-600 dark:text-green-400 h-12">
                            <div className="flex items-center"><Music className="mr-2 h-5 w-5" /> Spotify</div>
                            <span className="text-xs font-medium">HMJ MI Podcast</span>
                        </Button>
                    </Link>
                    <Link href="https://youtube.com/@hmjmipolsriofficial1346?si=p04XJpyGpdjkGr8y" target="_blank">
                        <Button variant="outline" className="w-full justify-between bg-red-600/10 hover:bg-red-600/20 border-red-600/20 text-red-600 dark:text-red-400 h-12">
                            <div className="flex items-center"><Youtube className="mr-2 h-5 w-5" /> YouTube</div>
                            <span className="text-xs font-medium">HMJ MI Official</span>
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
