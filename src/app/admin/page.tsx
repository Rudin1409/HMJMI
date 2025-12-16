'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, getCountFromServer } from 'firebase/firestore';
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

interface BeritaAcara {
  id: string;
}

const placeholderVisitorData = [
  { day: 'Rab', visitors: 2 },
  { day: 'Kam', visitors: 3 },
  { day: 'Jum', visitors: 1 },
  { day: 'Sab', visitors: 4 },
  { day: 'Min', visitors: 3 },
  { day: 'Sen', visitors: 5 },
  { day: 'Har', visitors: 7 },
];


export default function AdminPage() {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [totalPosts, setTotalPosts] = useState<number | null>(null);
  const [isCountLoading, setIsCountLoading] = useState(true);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    async function fetchPostCount() {
        if (!firestore) return;
        try {
            setIsCountLoading(true);
            const beritaCollection = collection(firestore, 'berita_acara');
            const snapshot = await getCountFromServer(beritaCollection);
            setTotalPosts(snapshot.data().count);
        } catch (error) {
            console.error("Error fetching post count: ", error);
            setTotalPosts(0);
        } finally {
            setIsCountLoading(false);
        }
    }
    fetchPostCount();
  }, [firestore]);


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
            <h1 className="text-3xl font-bold">Dasbor</h1>
            <p className="text-muted-foreground">Selamat datang kembali! Berikut ringkasan situs Anda.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Postingan</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {isCountLoading ? (
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
                    <div className="text-2xl font-bold">10</div>
                    <p className="text-xs text-muted-foreground">Total kunjungan unik (placeholder)</p>
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
                    <RechartsBarChart data={placeholderVisitorData}>
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

function Skeleton({className}: {className?: string}) {
    return <div className={`animate-pulse bg-muted rounded-md ${className}`} />;
}
