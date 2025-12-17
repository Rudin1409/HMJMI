'use client';

import React, { useState, useEffect } from 'react';
import { getFirestore, collectionGroup, query, orderBy, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { getApp } from 'firebase/app';
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
import { Loader2, CheckCircle, XCircle, Trash2, Eye, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { initializeFirebase } from '@/firebase';

interface Comment {
    id: string;
    author: string;
    content: string;
    date: any;
    status: 'pending' | 'approved' | 'rejected';
    articleTitle?: string;
    path: string; // Store path string to reconstruct ref
}

const formatDate = (date: any) => {
    if (!date) return '-';
    try {
        if (date.toDate) return format(date.toDate(), 'd MMM yyyy, HH:mm', { locale: id });
        return format(new Date(date), 'd MMM yyyy, HH:mm', { locale: id });
    } catch (e) {
        return '-';
    }
};

export default function CommentsManagementPage() {
    const { toast } = useToast();
    const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [processingId, setProcessingId] = useState<string | null>(null);

    // Manual listener state
    const [manualComments, setManualComments] = useState<Comment[]>([]);
    const [manualLoading, setManualLoading] = useState(true);

    useEffect(() => {
        // Ensure Firebase is initialized
        initializeFirebase();

        let db;
        try {
            db = getFirestore(getApp());
        } catch (e) {
            console.error("Firebase not initialized", e);
            setManualLoading(false);
            return;
        }

        const q = query(collectionGroup(db, 'comments'), orderBy('date', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map((d: any) => ({
                ...d.data(),
                id: d.id,
                path: d.ref.path // VITAL: Keep the path strictly
            }));
            setManualComments(items);
            setManualLoading(false);
        }, (err) => {
            console.error("CG Error", err);
            setManualLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const performUpdate = async (comment: Comment, newStatus: 'approved' | 'rejected') => {
        setProcessingId(comment.id);
        const db = getFirestore(getApp());
        try {
            const ref = doc(db, comment.path);
            await updateDoc(ref, { status: newStatus });
            toast({
                title: "Berhasil",
                description: `Komentar ${newStatus === 'approved' ? 'disetujui' : 'ditolak'}`,
            });
            setIsDialogOpen(false);
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
        const db = getFirestore(getApp());
        try {
            await deleteDoc(doc(db, comment.path));
            toast({
                title: "Berhasil",
                description: "Komentar dihapus",
            });
            setIsDialogOpen(false);
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


    if (manualLoading) {
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
                        {manualComments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                    Belum ada komentar masuk.
                                </TableCell>
                            </TableRow>
                        ) : (
                            manualComments.map((comment) => (
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
