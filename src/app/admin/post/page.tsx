
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser, useFirestore } from '@/firebase';
import { useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, Upload } from 'lucide-react';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

const formSchema = z.object({
  title: z.string().min(5, 'Judul harus memiliki setidaknya 5 karakter.'),
  content: z.string().min(20, 'Konten harus memiliki setidaknya 20 karakter.'),
  author: z.string().min(2, 'Author is required.'),
  divisionId: z.string().optional(),
  imageUrl: z.string().optional(),
  category: z.string({ required_error: 'Kategori harus dipilih.' }),
});

type BeritaFormData = z.infer<typeof formSchema>;

interface BeritaAcara extends BeritaFormData {
  date: any; // Firestore timestamp
}

function PostForm() {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const isNewPost = id === 'new';

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const beritaRef = useMemoFirebase(() => {
    if (isNewPost || !firestore || !id) return null;
    return doc(firestore, 'berita_acara', id);
  }, [firestore, id, isNewPost]);

  const { data: postData, isLoading: isPostLoading } = useDoc<BeritaAcara>(beritaRef);

  const form = useForm<BeritaFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      author: 'Dept. Humas',
      divisionId: '',
      imageUrl: '',
    },
  });

  useEffect(() => {
    if (postData) {
      form.reset(postData);
      if(postData.imageUrl) {
        setImagePreview(postData.imageUrl)
      }
    }
  }, [postData, form]);
  
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

  const uploadImage = async (file: File): Promise<string> => {
      if(!firestore) throw new Error("Firestore not initialized");
      const storage = getStorage(firestore.app);
      const storageRef = ref(storage, `berita_images/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
  }

  const onSubmit = async (values: BeritaFormData) => {
    if (!firestore || !id) {
      setError("Database connection not available or ID is missing.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      let finalImageUrl = values.imageUrl || '';
      
      if (imageFile) {
          finalImageUrl = await uploadImage(imageFile);
      }
      
      if(!finalImageUrl && isNewPost) {
          throw new Error("Gambar unggulan wajib diisi untuk postingan baru.");
      }

      const dataToSave = {
        ...values,
        imageUrl: finalImageUrl,
        date: serverTimestamp(),
      };

      if (isNewPost) {
        await addDoc(collection(firestore, 'berita_acara'), dataToSave);
      } else {
        const postDocRef = doc(firestore, 'berita_acara', id);
        await setDoc(postDocRef, dataToSave, { merge: true });
      }
      router.push('/admin/posts');
    } catch (err: any) {
      setError(err.message);
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
                    <Button type="button" variant="outline" onClick={() => router.push('/admin/posts')} disabled={isLoading}>
                        Batal
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
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

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Konten</FormLabel>
                                    <FormControl>
                                      <RichTextEditor {...field} rows={15} disabled={isLoading} />
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
                                name="category"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kategori</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
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
                                name="author"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Penulis</FormLabel>
                                    <FormControl>
                                    <Input placeholder="cth. Dept. Humas" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="divisionId"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Divisi (Opsional)</FormLabel>
                                    <FormControl>
                                    <Input placeholder="cth. Medkraf" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Gambar Unggulan</CardTitle>
                            <CardDescription>Pilih gambar utama untuk postingan ini.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <FormItem>
                                <FormControl>
                                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk mengunggah</span></p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG, WEBP</p>
                                        </div>
                                        <Input type="file" className="hidden" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} disabled={isLoading}/>
                                    </label>
                                </FormControl>
                                {imagePreview && (
                                        <div className="mt-4 relative w-full aspect-video rounded-md overflow-hidden border-2 border-border">
                                            <Image src={imagePreview} alt="Pratinjau gambar" fill className="object-cover"/>
                                        </div>
                                )}
                                <FormMessage className="mt-2" />
                            </FormItem>
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
