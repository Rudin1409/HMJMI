'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import { Loader2, Send, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CommentSectionProps {
    postId: string;
    articleTitle: string;
}

interface Comment {
    id: string;
    author: string;
    content: string;
    date: any;
    status?: 'pending' | 'approved' | 'rejected';
}

const formatDate = (date: any) => {
    if (!date) return 'Baru saja';
    try {
        if (date.toDate) return format(date.toDate(), 'd MMMM yyyy, HH:mm', { locale: id });
        if (date instanceof Date) return format(date, 'd MMMM yyyy, HH:mm', { locale: id });
    } catch (e) {
        return '';
    }
    return '';
};

export function CommentSection({ postId, articleTitle }: CommentSectionProps) {
    const firestore = useFirestore();
    const [authorName, setAuthorName] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Fetch APPROVED comments only
    const commentsQuery = useMemoFirebase(() => {
        if (!firestore || !postId) return null;
        return query(
            collection(firestore, 'berita_acara', postId, 'comments')
        );
    }, [firestore, postId]);

    const { data: rawComments, isLoading } = useCollection<Comment>(commentsQuery);

    const comments = React.useMemo(() => {
        if (!rawComments) return [];
        return rawComments
            .filter(c => c.status === 'approved')
            .sort((a, b) => {
                const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date || 0);
                const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date || 0);
                return dateB.getTime() - dateA.getTime();
            });
    }, [rawComments]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firestore || !authorName.trim() || !commentContent.trim()) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(firestore, 'berita_acara', postId, 'comments'), {
                author: authorName,
                content: commentContent,
                date: serverTimestamp(),
                status: 'pending', // Default status
                articleTitle: articleTitle
            });
            setAuthorName('');
            setCommentContent('');
            setSubmitSuccess(true);
            setTimeout(() => setSubmitSuccess(false), 5000); // Hide success message after 5s
        } catch (error) {
            console.error("Error adding comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 mt-12" id="comments">
            <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Komentar ({comments?.length || 0})</h2>
            </div>

            {/* Comment Form */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                <CardHeader>
                    <CardTitle className="text-lg">Tinggalkan Komentar</CardTitle>
                </CardHeader>
                <CardContent>
                    {submitSuccess ? (
                        <Alert className="bg-green-500/10 border-green-500/50 text-green-500 mb-4">
                            <AlertTitle>Berhasil!</AlertTitle>
                            <AlertDescription>Komentar Anda telah dikirim dan menunggu moderasi admin sebelum ditampilkan.</AlertDescription>
                        </Alert>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Nama Anda</label>
                                <Input
                                    placeholder="Masukkan nama anda..."
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Komentar</label>
                                <Textarea
                                    placeholder="Tulis komentar anda di sini..."
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    required
                                    rows={4}
                                />
                            </div>
                            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengirim...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" /> Kirim Komentar
                                    </>
                                )}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-6">
                {isLoading ? (
                    <div className="flex justify-center py-8"><Loader2 className="animate-spin" /></div>
                ) : comments && comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4 p-4 rounded-lg bg-card/30 border border-border/50">
                            <Avatar className="h-10 w-10 border border-primary/30">
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${comment.author}&background=random`} />
                                <AvatarFallback>{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-sm text-foreground">{comment.author}</h4>
                                    <span className="text-xs text-muted-foreground">{formatDate(comment.date)}</span>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground py-8">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
                )}
            </div>
        </div>
    );
}
