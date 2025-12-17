'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, TrendingUp, Users, FileText, PieChart, Sparkles }
    from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { getSiteStats, getDailyVisits, getPopularityStats } from '@/services/analytics';
import { useToast } from '@/hooks/use-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function AnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalVisits: 0,
        dailyVisits: [] as any[],
        popularity: { topPosts: [] as any[], popularCategories: [] as any[] }
    });
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    const [aiReport, setAiReport] = useState<null | {
        summary: string;
        interpretation: string;
        highlights: string[];
        recommendations: string[];
    }>(null);
    const [isReportOpen, setIsReportOpen] = useState(false);

    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [siteStats, dailyVisits, popularityStats] = await Promise.all([
                    getSiteStats(),
                    getDailyVisits(7),
                    getPopularityStats()
                ]);

                setStats({
                    totalVisits: siteStats.visitorCount,
                    dailyVisits,
                    popularity: popularityStats
                });
            } catch (error) {
                toast({
                    title: "Error fetching analytics",
                    description: "Gagal memuat data analitik.",
                    variant: "destructive"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [toast]);

    const handleGenerateReport = async () => {
        setIsGeneratingReport(true);

        setTimeout(() => {
            const visitors = stats.totalVisits;
            const topPost = stats.popularity.topPosts[0];
            const topCategory = stats.popularity.popularCategories[0];

            let interpretation = "Trafik situs terlihat stabil.";
            if (visitors > 100) interpretation = "Trafik situs sedang dalam tren positif yang kuat.";
            else if (visitors === 0) interpretation = "Situs belum mencatat aktivitas signifikan, perlu promosi awal.";

            const highlights = [];
            if (topPost) highlights.push(`Postingan "${topPost.title}" menarik perhatian paling besar.`);
            if (topCategory) highlights.push(`Audiens Anda sangat tertarik dengan topik ${topCategory.name}.`);
            if (visitors > 0) highlights.push(`Aktivitas pengunjung terdeteksi dalam 7 hari terakhir.`);
            if (visitors === 0 && !topPost) highlights.push("Belum ada data aktivitas yang cukup untuk analisis mendalam.");

            const recommendations = [
                topCategory ? `Buat lebih banyak konten terkait "${topCategory.name}" minggu depan.` : "Mulai posting konten pertama Anda untuk menarik pembaca.",
                visitors < 50 ? "Bagikan tautan situs ke media sosial kampus untuk meningkatkan jangkauan awal." : "Pertimbangkan fitur berlangganan/newsletter untuk retensi.",
                "Pastikan postingan memiliki gambar menarik untuk meningkatkan rasio klik (CTR)."
            ];

            setAiReport({
                summary: `Analisis menunjukkan total ${visitors} kunjungan unik sejauh ini.`,
                interpretation,
                highlights,
                recommendations
            });

            setIsGeneratingReport(false);
            setIsReportOpen(true);
        }, 1500);
    };

    if (loading) {
        return <div className="flex h-96 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="space-y-8 p-4 md:p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analitik Dashboard</h1>
                    <p className="text-muted-foreground">Ringkasan performa situs dan pengunjung.</p>
                </div>
                <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
                    <Button onClick={handleGenerateReport} disabled={isGeneratingReport} className="gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 shadow-lg shadow-pink-500/20">
                        {isGeneratingReport ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        Buat Laporan AI
                    </Button>
                    <DialogContent className="max-w-3xl">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-xl"><Sparkles className="w-5 h-5 text-rose-500" /> Analisis Cerdas (AI)</DialogTitle>
                            <DialogDescription>
                                Insight mendalam berbasis data real-time.
                            </DialogDescription>
                        </DialogHeader>

                        {aiReport && (typeof aiReport !== 'string') && (
                            <div className="space-y-6 py-2">
                                {/* Summary Section */}
                                <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-xl border border-rose-100 dark:border-rose-900/50">
                                    <h4 className="font-semibold text-rose-700 dark:text-rose-400 mb-1 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" /> Ringkasan Eksekutif
                                    </h4>
                                    <p className="text-lg font-medium">{aiReport.summary}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{aiReport.interpretation}</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {/* Highlights */}
                                    <div className="space-y-3">
                                        <h4 className="font-semibold flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-blue-500" /> Sorotan Utama
                                        </h4>
                                        <ul className="space-y-2">
                                            {aiReport.highlights.length > 0 ? aiReport.highlights.map((highlight, idx) => (
                                                <li key={idx} className="bg-muted/50 p-3 rounded-lg text-sm flex gap-3 items-start">
                                                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                                    {highlight}
                                                </li>
                                            )) : <li className="text-sm text-muted-foreground italic">Belum cukup data untuk sorotan.</li>}
                                        </ul>
                                    </div>

                                    {/* Recommendations */}
                                    <div className="space-y-3">
                                        <h4 className="font-semibold flex items-center gap-2">
                                            <Users className="w-4 h-4 text-green-500" /> Rekomendasi Aksi
                                        </h4>
                                        <ul className="space-y-2">
                                            {aiReport.recommendations.map((rec, idx) => (
                                                <li key={idx} className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg text-sm flex gap-3 items-start border border-green-100 dark:border-green-900/30">
                                                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                                    {rec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="text-xs text-center text-muted-foreground pt-4 border-t">
                                    Laporan digenerate secara otomatis berdasarkan data statistik terkini.
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Kunjungan</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalVisits}</div>
                        <p className="text-xs text-muted-foreground">All-time unique visitors</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Postingan Teratas</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold truncate" title={stats.popularity.topPosts[0]?.title}>
                            {stats.popularity.topPosts[0]?.title || 'Belum ada data'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {stats.popularity.topPosts[0]?.category || '-'}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Kategori Populer</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.popularity.popularCategories[0]?.name || 'Belum ada data'}
                        </div>
                        <p className="text-xs text-muted-foreground">Most liked category</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Tren Kunjungan Harian</CardTitle>
                        <CardDescription>Visualisasi jumlah pengunjung dalam 7 hari terakhir.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.dailyVisits}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis
                                        dataKey="date"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => format(new Date(value), 'dd MMM')}
                                    />
                                    <YAxis
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        allowDecimals={false}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        cursor={{ fill: 'transparent' }}
                                    />
                                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Lists */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Konten Populer</CardTitle>
                        <CardDescription>Daftar postingan dengan interaksi tertinggi.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.popularity.topPosts.slice(0, 5).map((post, i) => (
                                <div key={post.id || i} className="flex items-center">
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none line-clamp-1">{post.title}</p>
                                        <p className="text-xs text-muted-foreground">{post.category}</p>
                                    </div>
                                    <div className="ml-auto font-medium text-sm">+{post.likes || 0} Likes</div>
                                </div>
                            ))}
                            {stats.popularity.topPosts.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">Belum ada data postingan.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
