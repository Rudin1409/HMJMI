'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Users, FileText, BarChart } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { api } from '@/lib/api-client';
import { format } from 'date-fns';

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  
  const [totalPosts, setTotalPosts] = useState(0);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [dailyStats, setDailyStats] = useState<any[]>([]);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (!user) return;

    async function fetchDashboardData() {
      setIsPostsLoading(true);
      try {
        // 1. Fetch total posts
        const posts = await api.getPosts();
        setTotalPosts(posts.length);
        
        // 2. Fetch stats
        const stats = await api.getStats();
        setTotalVisitors(stats.visitorCount);

        // 3. Fetch daily visits
        const daily = await api.getDailyVisits(7);
        setDailyStats(daily.map((d: any) => ({
          day: format(new Date(d.date), 'dd MMM'),
          visitors: d.count
        })));
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
      } finally {
        setIsPostsLoading(false);
      }
    }
    
    fetchDashboardData();
  }, [user]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Selamat datang kembali! Berikut ringkasan situs Anda.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Postingan</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isPostsLoading ? (
              <Skeleton className="h-8 w-1/4" />
            ) : (
              <div className="text-2xl font-bold">{totalPosts}</div>
            )}
            <p className="text-xs text-muted-foreground">Jumlah semua postingan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengunjung</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisitors}</div>
            <p className="text-xs text-muted-foreground">Total kunjungan unik</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Grafik Pengunjung (7 Hari Terakhir)
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <RechartsBarChart data={dailyStats}>
              <XAxis
                dataKey="day"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))'
                }}
              />
              <Bar dataKey="visitors" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-muted rounded-md ${className}`} />;
}
