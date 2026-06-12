'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Loader2, AlertCircle, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface BeritaAcara {
  id: string;
  title: string;
  date: any; // REST response contains { seconds, nanoseconds } or Date string
  status: 'published' | 'draft';
  category: string;
  imageUrl: string;
  author: string;
}

export default function AdminPostsPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [berita, setBerita] = useState<BeritaAcara[]>([]);
  const [isBeritaLoading, setIsBeritaLoading] = useState(true);
  const [beritaError, setBeritaError] = useState<any>(null);

  const fetchPosts = async () => {
    setIsBeritaLoading(true);
    setBeritaError(null);
    try {
      const data = await api.getPosts();
      setBerita(data);
    } catch (err: any) {
      setBeritaError(err);
    } finally {
      setIsBeritaLoading(false);
    }
  };

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      fetchPosts();
    }
  }, [user, isUserLoading, router]);

  const handleDelete = async (id: string) => {
    try {
      await api.deletePost(id);
      fetchPosts(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const formatDate = (dateObj: any) => {
    if (!dateObj) return 'No date';
    
    try {
      // Handle Firebase compatibility shape { seconds }
      if (dateObj.seconds) {
        return format(new Date(dateObj.seconds * 1000), 'd MMM yyyy', { locale: id });
      }
      return format(new Date(dateObj), 'd MMM yyyy', { locale: id });
    } catch (e) {
      return 'No date';
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Postingan Berita</CardTitle>
          <CardDescription>Kelola semua postingan berita untuk website.</CardDescription>
        </div>
        <Button asChild>
          <Link href="/admin/post?id=new">
            <PlusCircle className="mr-2 h-4 w-4" /> Buat Postingan Baru
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isBeritaLoading && (
            <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )}
        {beritaError && (
             <div className="text-destructive-foreground bg-destructive p-4 rounded-md flex items-center gap-4">
                <AlertCircle />
                <p>Error fetching news data: {beritaError.message || 'Gagal memuat berita'}</p>
             </div>
        )}
        {!isBeritaLoading && !beritaError && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Gambar</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Dibuat</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {berita && berita.length > 0 ? (
                berita.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <ImageWithSkeleton 
                        src={item.imageUrl || '/placeholder.png'} 
                        alt={item.title}
                        width={64}
                        height={64}
                        className="rounded-md object-cover aspect-square"
                        containerClassName="w-16 h-16 rounded-md overflow-hidden"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'published' ? 'default' : 'secondary'} className={cn(
                        item.status === 'published' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                      )}>
                        {item.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(item.date)}</TableCell>
                    <TableCell className="text-right">
                       <AlertDialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/post?id=${item.id}`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Hapus
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>
                           <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini tidak bisa dibatalkan. Ini akan menghapus postingan secara permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-destructive hover:bg-destructive/90">
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                       </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    Belum ada postingan berita.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
