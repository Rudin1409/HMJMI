'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/firebase';
import { api } from '@/lib/api-client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, Upload, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TiptapEditor } from '@/components/ui/tiptap-editor';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { departments } from '@/data/profile-data';
import { getImageUrl } from '@/lib/utils';

const formSchema = z.object({
  title: z.string().min(5, 'Judul harus memiliki setidaknya 5 karakter.'),
  content: z.string().min(20, 'Konten harus memiliki setidaknya 20 karakter.'),
  imageUrl: z.string().optional(),
  category: z.string({ required_error: 'Kategori harus dipilih.' }).min(1, 'Kategori wajib dipilih!'),
  status: z.enum(['draft', 'published'], { required_error: 'Status harus dipilih' }),
  showAuthorInfo: z.boolean().default(true),
});

type BeritaFormData = z.infer<typeof formSchema>;

interface BeritaAcara extends BeritaFormData {
  date: any;
  author: string;
}

function PostForm() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const isNewPost = id === 'new';

  const [isLoading, setIsLoading] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(!isNewPost);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFit, setImageFit] = useState<'cover' | 'contain'>('cover');
  const [imageZoom, setImageZoom] = useState<number>(1);
  const [imagePosY, setImagePosY] = useState<number>(50);

  const form = useForm<BeritaFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      imageUrl: '',
      category: undefined,
      status: 'draft',
      showAuthorInfo: true,
    },
  });

  const showAuthorInfo = form.watch('showAuthorInfo');

  // Author preview helper values
  const getPreviewWriterName = () => {
    if (showAuthorInfo && user) {
      return user.username || 'Penulis';
    }
    return 'Redaksi HMJ MI';
  };

  const getPreviewRole = () => {
    if (showAuthorInfo && user?.departmentId) {
      const dept = departments.find(d => d.id === user.departmentId);
      return dept ? `Departemen ${dept.name}` : 'Kontributor Ahli';
    }
    return 'Media & Informasi';
  };

  const getPreviewBio = () => {
    if (showAuthorInfo) {
      return user?.bio || 'Belum ada deskripsi/bio. Atur di menu Pengaturan.';
    }
    return 'Akun resmi Redaksi HMJ MI. Menyajikan berita dan informasi terkini seputar kegiatan Himpunan Mahasiswa Jurusan Manajemen Informatika Politeknik Negeri Sriwijaya.';
  };

  const getPreviewAvatar = () => {
    if (showAuthorInfo && user?.avatar) {
      return getImageUrl(user.avatar);
    }
    return '/logo/logohmj.png';
  };

  // Fetch post data for editing
  useEffect(() => {
    if (isNewPost || !id) return;

    const fetchPost = async () => {
      setIsPostLoading(true);
      try {
        const postData = await api.getPost(id);
        // Format postData content for form structure (category, status, title, etc)
        form.reset({
          title: postData.title,
          content: postData.content,
          imageUrl: postData.imageUrl || '',
          category: postData.category,
          status: postData.status,
          showAuthorInfo: postData.showAuthorInfo ?? true,
        });
        if (postData.imageUrl) {
          setImagePreview(postData.imageUrl);
        }
        
        // Parse and load image position settings if present
        let fit: 'cover' | 'contain' = 'cover';
        let zoom = 1;
        let posY = 50;
        if (postData.imageStyle) {
          try {
            const parsed = JSON.parse(postData.imageStyle);
            if (parsed && typeof parsed === 'object') {
              fit = parsed.fit || 'cover';
              zoom = parsed.zoom ?? 1;
              posY = parsed.posY ?? 50;
            }
          } catch (e) {
            console.error("Failed to parse image style:", e);
          }
        }
        setImageFit(fit);
        setImageZoom(zoom);
        setImagePosY(posY);
      } catch (err: any) {
        console.error("Gagal memuat berita:", err);
        setError("Gagal memuat detail postingan berita.");
      } finally {
        setIsPostLoading(false);
      }
    };

    fetchPost();
  }, [id, isNewPost, form]);

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const onSubmit = async (values: BeritaFormData) => {
    if (!id) {
      setError("ID postingan tidak tersedia.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      let finalImageUrl = values.imageUrl || '';

      if (imageFile) {
        setIsUploading(true);
        try {
          finalImageUrl = await api.uploadImage(imageFile);
        } catch (uploadErr: any) {
          throw new Error("Gagal mengunggah gambar ke server: " + uploadErr.message);
        } finally {
          setIsUploading(false);
        }
      }

      if (!finalImageUrl && isNewPost) {
        throw new Error("Gambar unggulan wajib diisi untuk postingan baru.");
      }

      const serializedStyle = JSON.stringify({
        fit: imageFit,
        zoom: imageZoom,
        posY: imagePosY
      });

      const dataToSave = {
        ...values,
        imageUrl: finalImageUrl,
        imageStyle: serializedStyle,
      };

      if (isNewPost) {
        await api.createPost(dataToSave);
      } else {
        await api.updatePost(id, dataToSave);
      }
      router.push('/admin/berita');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat menyimpan postingan.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isUserLoading || (!isNewPost && isPostLoading)) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!user) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{isNewPost ? 'Buat Postingan Baru' : 'Edit Postingan'}</h1>
            <p className="text-muted-foreground">Isi formulir di bawah ini untuk membuat atau mengedit postingan berita.</p>
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push('/admin/berita')} disabled={isLoading}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading || isUploading}>
              {isLoading || isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isNewPost ? 'Terbitkan' : 'Simpan Perubahan'}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Terjadi Kesalahan</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Konten Postingan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Postingan</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan judul..." {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Gambar Unggulan</FormLabel>
                  <FormControl>
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="flex flex-col items-center text-center">
                          <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk mengunggah</span></p>
                          <p className="text-xs text-muted-foreground">PNG, JPG, WEBP</p>
                        </div>
                      </div>
                      <Input type="file" className="hidden" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} disabled={isLoading} />
                    </label>
                  </FormControl>
                  {imagePreview && (
                    <div className="space-y-4 border border-border bg-muted/20 p-4 rounded-xl mt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground flex items-center gap-1.5 text-sm">
                          <Sparkles className="h-4 w-4 text-pink-500" /> Posisi & Zoom Gambar (Pratinjau)
                        </span>
                      </div>

                      {/* Real-time Preview Box */}
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-black/90">
                        <img
                          src={imagePreview}
                          alt="Pratinjau penyesuaian gambar"
                          className="w-full h-full"
                          style={{
                            objectFit: imageFit,
                            objectPosition: `50% ${imagePosY}%`,
                            transform: `scale(${imageZoom})`,
                            transformOrigin: 'center center',
                          }}
                        />
                        {isUploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">Uploading...</div>}
                      </div>

                      {/* Preset Recommendation Buttons */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Rekomendasi Cepat</label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-xs h-9 justify-start px-2.5 font-normal border-border/80 hover:bg-muted"
                            onClick={() => {
                              setImageFit('cover');
                              setImageZoom(1);
                              setImagePosY(50);
                            }}
                          >
                            🎯 Default / Tengah
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-xs h-9 justify-start px-2.5 font-normal border-border/80 hover:bg-muted"
                            onClick={() => {
                              setImageFit('cover');
                              setImageZoom(1.2);
                              setImagePosY(15);
                            }}
                          >
                            👤 Fokus Atas (Wajah)
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-xs h-9 justify-start px-2.5 font-normal border-border/80 hover:bg-muted"
                            onClick={() => {
                              setImageFit('cover');
                              setImageZoom(1.4);
                              setImagePosY(50);
                            }}
                          >
                            🔍 Fokus Tengah (Zoom)
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-xs h-9 justify-start px-2.5 font-normal border-border/80 hover:bg-muted"
                            onClick={() => {
                              setImageFit('contain');
                              setImageZoom(1);
                              setImagePosY(50);
                            }}
                          >
                            🖼️ Tampilkan Utuh (Fit)
                          </Button>
                        </div>
                      </div>

                      {/* Manual Sliders */}
                      <div className="space-y-4 pt-3 border-t border-border">
                        {/* Object Fit Selector */}
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs font-semibold">Tipe Penyesuaian Fit</span>
                          <div className="flex bg-muted p-0.5 rounded-lg border border-border text-xs">
                            <button
                              type="button"
                              className={`px-3 py-1.5 rounded-md font-medium transition-all duration-200 ${imageFit === 'cover' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                              onClick={() => setImageFit('cover')}
                            >
                              Cover (Penuhi)
                            </button>
                            <button
                              type="button"
                              className={`px-3 py-1.5 rounded-md font-medium transition-all duration-200 ${imageFit === 'contain' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                              onClick={() => setImageFit('contain')}
                            >
                              Contain (Muat)
                            </button>
                          </div>
                        </div>

                        {/* Zoom Slider */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold">Skala Zoom</span>
                            <span className="font-mono text-[11px] text-muted-foreground font-bold bg-muted px-1.5 py-0.5 rounded">
                              {imageZoom.toFixed(2)}x
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="2"
                            step="0.05"
                            value={imageZoom}
                            onChange={(e) => setImageZoom(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                          />
                        </div>

                        {/* Vertical position Y Slider */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold">Pergeseran Posisi Y (Vertikal)</span>
                            <span className="font-mono text-[11px] text-muted-foreground font-bold bg-muted px-1.5 py-0.5 rounded">
                              {imagePosY}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={imagePosY}
                            onChange={(e) => setImagePosY(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                          />
                          <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                            <span>0% (Atas)</span>
                            <span>50% (Tengah)</span>
                            <span>100% (Bawah)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <FormMessage className="mt-2" />
                </FormItem>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konten</FormLabel>
                      <FormControl>
                        <TiptapEditor
                          content={field.value}
                          onChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Status Postingan</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="published" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Publish
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="draft" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Draft
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori <span className="text-red-500">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ''}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Berita HMJ">Berita HMJ</SelectItem>
                          <SelectItem value="Artikel & Pengetahuan">Artikel & Pengetahuan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="showAuthorInfo"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Informasi Penulis</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(val) => field.onChange(val === 'true')}
                          value={field.value ? 'true' : 'false'}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Tampilkan Data Diri (Nama, Foto, Bio, Departemen)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Pakai Template Dasar (Redaksi HMJ MI)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Pratinjau Tentang Penulis */}
            <Card className="bg-card/50 border-primary/20 overflow-hidden">
                <CardHeader className="bg-primary/5 pb-4">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <span>Pratinjau Tentang Penulis</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 flex flex-col items-center text-center">
                    <Avatar className="h-16 w-16 mb-3 border-2 border-primary shadow overflow-hidden">
                        <AvatarImage src={getPreviewAvatar()} className="object-cover" />
                        <AvatarFallback>{getPreviewWriterName().substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h4 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                        {getPreviewWriterName()}
                    </h4>
                    <p className="text-xs text-primary mb-2.5 font-medium">{getPreviewRole()}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        {getPreviewBio()}
                    </p>
                </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default function PostFormPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <PostForm />
    </Suspense>
  );
}
