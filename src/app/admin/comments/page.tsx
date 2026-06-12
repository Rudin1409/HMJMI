'use client';

import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Loader2, CheckCircle, XCircle, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api-client';

interface Comment {
    id: string;
    postId: string;
    author: string;
    content: string;
    date: any;
    status: 'pending' | 'approved' | 'rejected';
    articleTitle?: string;
}

const formatDate = (dateObj: any) => {
    if (!dateObj) return '-';
    try {
        if (dateObj.seconds) {
            return format(new Date(dateObj.seconds * 1000), 'd MMM yyyy, HH:mm', { locale: id });
        }
        return format(new Date(dateObj), 'd MMM yyyy, HH:mm', { locale: id });
    } catch (e) {
        return '-';
    }
};

export default function CommentsManagementPage() {
    const { toast } = useToast();
    const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [processingId, setProcessingId] = useState<string | null>(null);

    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const data = await api.getComments();
            setComments(data);
        } catch (e) {
            console.error("Gagal mengambil komentar", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const performUpdate = async (comment: Comment, newStatus: 'approved' | 'rejected') => {
        setProcessingId(comment.id);
        try {
            await api.updateComment(comment.id, { status: newStatus });
            toast({
                title: "Berhasil",
                description: `Komentar ${newStatus === 'approved' ? 'disetujui' : 'ditolak'}`,
            });
            setIsDialogOpen(false);
            fetchComments(); // Refresh comments
        } catch (e) {
            console.error(e);
            toast({
                title: "Gagal",
                description: "Gagal update status",
                variant: "destructive"
            });
        } finally {
            setProcessingId(null);
        }
    };

    const performDelete = async (comment: Comment) => {
        if (!confirm("Yakin hapus komentar ini?")) return;
        setProcessingId(comment.id);
        try {
            await api.deleteComment(comment.id);
            toast({
                title: "Berhasil",
                description: "Komentar dihapus",
            });
            setIsDialogOpen(false);
            fetchComments(); // Refresh comments
        } catch (e) {
            console.error(e);
            toast({
                title: "Gagal",
                description: "Gagal hapus",
                variant: "destructive"
            });
        } finally {
            setProcessingId(null);
        }
    };

    if (isLoading) {
        return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Manajemen Komentar</h1>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Penulis</TableHead>
                            <TableHead className="w-[300px]">Komentar</TableHead>
                            <TableHead>Artikel</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {comments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                    Belum ada komentar masuk.
                                </TableCell>
                            </TableRow>
                        ) : (
                            comments.map((comment) => (
                                <TableRow key={comment.id}>
                                    <TableCell className="font-medium">{comment.author}</TableCell>
                                    <TableCell className="truncate max-w-[300px]">{comment.content}</TableCell>
                                    <TableCell>{comment.articleTitle || '-'}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={comment.status} />
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">{formatDate(comment.date)}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog open={isDialogOpen && selectedComment?.id === comment.id} onOpenChange={(open) => {
                                            setIsDialogOpen(open);
                                            if (open) setSelectedComment(comment);
                                        }}>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="w-4 h-4 text-muted-foreground" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Detail Komentar</DialogTitle>
                                                    <DialogDescription>
                                                        Tinjau komentar dari <strong>{comment.author}</strong>
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4 py-4">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold uppercase text-muted-foreground">Artikel</label>
                                                        <p className="text-sm">{comment.articleTitle || 'Tidak diketahui'}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold uppercase text-muted-foreground">Konten</label>
                                                        <div className="p-3 bg-muted rounded-md text-sm leading-relaxed">
                                                            {comment.content}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span>{formatDate(comment.date)}</span>
                                                        <span>•</span>
                                                        <StatusBadge status={comment.status} />
                                                    </div>
                                                </div>
                                                <DialogFooter className="flex gap-2 sm:justify-start">
                                                    {comment.status !== 'approved' && (
                                                        <Button
                                                            className="bg-green-600 hover:bg-green-700 text-white"
                                                            onClick={() => performUpdate(comment, 'approved')}
                                                            disabled={!!processingId}
                                                        >
                                                            {processingId === comment.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                                                            Setujui
                                                        </Button>
                                                    )}
                                                    {comment.status !== 'rejected' && (
                                                        <Button
                                                            variant="secondary"
                                                            onClick={() => performUpdate(comment, 'rejected')}
                                                            disabled={!!processingId}
                                                        >
                                                            {processingId === comment.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4 mr-2" />}
                                                            Tolak
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="destructive"
                                                        className="ml-auto"
                                                        onClick={() => performDelete(comment)}
                                                        disabled={!!processingId}
                                                    >
                                                        {processingId === comment.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
                                                        Hapus
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'approved') return <Badge className="bg-green-500 hover:bg-green-600">Disetujui</Badge>;
    if (status === 'rejected') return <Badge variant="destructive">Ditolak</Badge>;
    return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Pending</Badge>;
}
