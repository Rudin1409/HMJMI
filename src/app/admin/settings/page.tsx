'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@/firebase';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, User, Lock, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { departments } from '@/data/profile-data';

export default function SettingsPage() {
    const { user, isUserLoading, refreshUser } = useUser();
    const { toast } = useToast();

    // Profile State
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [bio, setBio] = useState('');
    const [isProfileSaving, setIsProfileSaving] = useState(false);

    // Password State
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordSaving, setIsPasswordSaving] = useState(false);

    // Image Upload State
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (user) {
            setDisplayName(user.username || '');
            setPhotoURL(user.avatar || '');
            setBio(user.bio || '');
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
        if (!user) return;

        setIsProfileSaving(true);
        try {
            let finalPhotoURL = photoURL;

            // Upload new image if selected
            if (imageFile) {
                setIsUploading(true);
                try {
                    finalPhotoURL = await api.uploadImage(imageFile);
                } catch (uploadErr: any) {
                    throw new Error("Gagal mengunggah foto profil: " + uploadErr.message);
                } finally {
                    setIsUploading(false);
                }
            }

            // Update Profile via REST API
            await api.updateProfile(displayName, finalPhotoURL, bio);

            toast({
                title: "Profil Diperbarui",
                description: "Informasi profil dan foto berhasil disimpan.",
                variant: "default",
            });

            // Cleanup states
            setImageFile(null);
            setUploadPreview(null);
            setPhotoURL(finalPhotoURL);

            // Refresh layout user state
            if (refreshUser) {
                await refreshUser();
            }

        } catch (error: any) {
            toast({
                title: "Gagal Memperbarui Profil",
                description: error.message || "Terjadi kesalahan.",
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
            await api.updatePassword(newPassword);
            toast({
                title: "Kata Sandi Diperbarui",
                description: "Kata sandi Anda berhasil diubah.",
                variant: "default",
            });
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            toast({
                title: "Gagal Mengubah Kata Sandi",
                description: error.message || "Gagal memperbarui kata sandi.",
                variant: "destructive",
            });
        } finally {
            setIsPasswordSaving(false);
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
                                    <Label htmlFor="displayName">Nama Pengguna (Username)</Label>
                                    <Input
                                        id="displayName"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Masukkan username"
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
                                <div className="space-y-2">
                                    <Label htmlFor="department">Departemen</Label>
                                    <Input
                                        id="department"
                                        value={departments.find(d => d.id === user?.departmentId)?.fullName || user?.departmentId || '-'}
                                        disabled
                                        className="bg-muted/50 text-muted-foreground"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Deskripsi Penulis (Bio)</Label>
                                    <Textarea
                                        id="bio"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Tuliskan sedikit profil tentang Anda sebagai penulis berita..."
                                        className="min-h-[100px] resize-none"
                                        maxLength={1000}
                                    />
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
        </div>
    );
}
