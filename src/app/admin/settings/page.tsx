'use client';

import React, { useState, useEffect } from 'react';
import { useUser, useAuth, useFirestore } from '@/firebase';
import { useImageUpload } from '@/hooks/use-image-upload';
import { updateProfile, updatePassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, User, Lock, Trash2, Camera, AlertTriangle, UploadCloud } from 'lucide-react';
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

export default function SettingsPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const { uploadImage, isLoading: isUploading } = useImageUpload();
    const { toast } = useToast();

    // Profile State
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [isProfileSaving, setIsProfileSaving] = useState(false);

    // Password State
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordSaving, setIsPasswordSaving] = useState(false);

    // Image Upload State
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Danger Zone State
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]);

    // Handle Image Selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setUploadPreview(URL.createObjectURL(file));
        }
    };

    // Update Profile Handler
    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !firestore) return;

        setIsProfileSaving(true);
        try {
            let finalPhotoURL = photoURL;

            // Upload new image if selected
            if (imageFile) {
                const uploadedUrl = await uploadImage(imageFile);
                if (uploadedUrl) {
                    finalPhotoURL = uploadedUrl;
                }
            }

            // 1. Update Firebase Auth Profile
            await updateProfile(user, {
                displayName: displayName,
                photoURL: finalPhotoURL
            });

            // 2. Update Firestore User Document (Sync for Navbar/Profile)
            const userRef = doc(firestore, 'users', user.uid);
            await updateDoc(userRef, {
                avatar: finalPhotoURL,
                username: displayName
            });

            toast({
                title: "Profil Diperbarui",
                description: "Informasi profil dan foto berhasil disimpan dan disinkronkan.",
                variant: "default",
            });

            // Cleanup states
            setImageFile(null);
            setUploadPreview(null);
            setPhotoURL(finalPhotoURL);

        } catch (error: any) {
            toast({
                title: "Gagal Memperbarui Profil",
                description: "Pastikan Anda Login. " + error.message,
                variant: "destructive",
            });
        } finally {
            setIsProfileSaving(false);
        }
    };

    // Update Password Handler
    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (newPassword !== confirmPassword) {
            toast({
                title: "Kata Sandi Tidak Cocok",
                description: "Konfirmasi kata sandi baru tidak sesuai.",
                variant: "destructive",
            });
            return;
        }

        if (newPassword.length < 6) {
            toast({
                title: "Kata Sandi Lemah",
                description: "Kata sandi harus minimal 6 karakter.",
                variant: "destructive",
            });
            return;
        }

        setIsPasswordSaving(true);
        try {
            await updatePassword(user, newPassword);
            toast({
                title: "Kata Sandi Diperbarui",
                description: "Kata sandi Anda berhasil diubah. Silakan login ulang jika diminta.",
                variant: "default",
            });
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            if (error.code === 'auth/requires-recent-login') {
                toast({
                    title: "Otentikasi Ulang Diperlukan",
                    description: "Silakan logout dan login kembali untuk mengubah kata sandi.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Gagal Mengubah Kata Sandi",
                    description: error.message,
                    variant: "destructive",
                });
            }
        } finally {
            setIsPasswordSaving(false);
        }
    };

    // Delete Account Handler
    const handleDeleteAccount = async () => {
        if (!user) return;
        if (deleteConfirmation !== 'HAPUS') return;

        setIsDeleting(true);
        try {
            await deleteUser(user);
            // Firebase auth state change will trigger redirect in layout/middleware
        } catch (error: any) {
            if (error.code === 'auth/requires-recent-login') {
                toast({
                    title: "Gagal Menghapus Akun",
                    description: "Demi keamanan, silakan logout dan login kembali sebelum menghapus akun.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                });
            }
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
        }
    };


    if (isUserLoading) {
        return <div className="flex justify-center items-center h-96"><Loader2 className="animate-spin w-8 h-8" /></div>;
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-20">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Pengaturan Akun</h1>
                <p className="text-muted-foreground mt-2">Kelola profil, keamanan, dan preferensi akun Anda.</p>
            </div>

            {/* Profile Section */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        <CardTitle>Profil</CardTitle>
                    </div>
                    <CardDescription>Perbarui informasi profil dan foto Anda di sini.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpdateProfile}>
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center gap-4 min-w-[200px]">
                                <Avatar className="w-32 h-32 border-4 border-muted">
                                    <AvatarImage src={uploadPreview || photoURL} className="object-cover" />
                                    <AvatarFallback className="text-4xl bg-muted">{displayName?.[0]?.toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                        disabled={isUploading || isProfileSaving}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => document.getElementById('avatar-upload')?.click()}
                                        disabled={isUploading || isProfileSaving}
                                    >
                                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                                        Unggah Foto
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">Rekomendasi ukuran: 400x400px</p>
                            </div>

                            {/* Inputs Section */}
                            <div className="flex-1 space-y-6 w-full">
                                <div className="space-y-2">
                                    <Label htmlFor="displayName">Nama Lengkap</Label>
                                    <Input
                                        id="displayName"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Masukkan nama lengkap"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Alamat Email</Label>
                                    <Input
                                        id="email"
                                        value={user?.email || ''}
                                        disabled
                                        className="bg-muted/50 text-muted-foreground"
                                    />
                                    <p className="text-xs text-muted-foreground">Email tidak dapat diubah.</p>
                                </div>
                                <div className="pt-4">
                                    <Button type="submit" disabled={isUploading || isProfileSaving}>
                                        {isProfileSaving ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
                                            </>
                                        ) : (
                                            'Simpan Profil'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Security Section */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary" />
                        <CardTitle>Keamanan</CardTitle>
                    </div>
                    <CardDescription>Ubah kata sandi akun Anda secara berkala untuk keamanan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpdatePassword} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">Kata Sandi Baru</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Minimal 6 karakter"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi Baru</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Ulangi kata sandi baru"
                                />
                            </div>
                        </div>
                        <div className="pt-4">
                            <Button type="submit" disabled={isPasswordSaving || !newPassword}>
                                {isPasswordSaving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memperbarui...
                                    </>
                                ) : (
                                    'Perbarui Kata Sandi'
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/30 bg-destructive/5 shadow-sm">
                <CardHeader>
                    <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="w-5 h-5" />
                        <CardTitle>Zona Berbahaya</CardTitle>
                    </div>
                    <CardDescription>Tindakan ini tidak dapat diurungkan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-6">
                        Menghapus akun Anda akan menghilangkan akses login secara permanen. Pastikan Anda benar-benar yakin sebelum melakukan tindakan ini.
                    </p>
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="destructive">Hapus Akun Saya</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Apakah Anda Yakin?</DialogTitle>
                                <DialogDescription>
                                    Tindakan ini permanen. Ketik <strong>HAPUS</strong> untuk mengonfirmasi penghapusan akun anda.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                                <Input
                                    value={deleteConfirmation}
                                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                                    placeholder="Ketik HAPUS"
                                    className="border-destructive/50 focus-visible:ring-destructive"
                                />
                            </div>
                            <DialogFooter>
                                <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>Batal</Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDeleteAccount}
                                    disabled={deleteConfirmation !== 'HAPUS' || isDeleting}
                                >
                                    {isDeleting ? <Loader2 className="animate-spin w-4 h-4" /> : 'Hapus Permanen'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    );
}
