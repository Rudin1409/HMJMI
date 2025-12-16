
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth, useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, ChevronLeft } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long.'),
  content: z.string().min(20, 'Content must be at least 20 characters long.'),
  author: z.string().min(2, 'Author is required.'),
  divisionId: z.string().optional(),
  imageUrl: z.string().optional(),
});

type BeritaFormData = z.infer<typeof formSchema>;

interface BeritaAcara {
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  author: string;
  divisionId?: string;
}

export default function PostFormPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const isNewPost = id === 'new';

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const beritaRef = useMemoFirebase(() => {
    if (isNewPost || !firestore || !id) return null;
    return doc(firestore, 'berita_acara', Array.isArray(id) ? id[0] : id);
  }, [firestore, id, isNewPost]);

  const { data: postData, isLoading: isPostLoading } = useDoc<BeritaAcara>(beritaRef);

  const form = useForm<BeritaFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
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
    if (!firestore) {
      setError("Database connection not available.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      let finalImageUrl = values.imageUrl || '';
      
      if (imageFile) {
          finalImageUrl = await uploadImage(imageFile);
      }
      
      if(!finalImageUrl && !isNewPost && !postData?.imageUrl) {
          throw new Error("Image is required for the post.");
      }


      const dataToSave = {
        ...values,
        imageUrl: finalImageUrl,
        date: new Date().toISOString(),
      };

      if (isNewPost) {
        await addDoc(collection(firestore, 'berita_acara'), dataToSave);
      } else {
        const postDocRef = doc(firestore, 'berita_acara', Array.isArray(id) ? id[0] : id);
        await setDoc(postDocRef, dataToSave, { merge: true });
      }
      router.push('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isUserLoading || isPostLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <Button variant="ghost" size="sm" className="w-fit p-0 h-auto mb-4" onClick={() => router.back()}>
            <ChevronLeft className="mr-2 h-4 w-4"/> Back to Dashboard
          </Button>
          <CardTitle>{isNewPost ? 'Create New Post' : 'Edit Post'}</CardTitle>
          <CardDescription>Fill in the details for the news post.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>An Error Occurred</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title" {...field} disabled={isLoading} />
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
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your post content here..." {...field} rows={10} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-8">
                 <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Dept. Humas" {...field} disabled={isLoading} />
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
                        <FormLabel>Division (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Medkraf" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              
              <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                      <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} disabled={isLoading}/>
                  </FormControl>
                   {imagePreview && (
                        <div className="mt-4 relative w-full max-w-md aspect-video rounded-md overflow-hidden border">
                            <Image src={imagePreview} alt="Image preview" fill className="object-cover"/>
                        </div>
                   )}
                  <FormMessage />
              </FormItem>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push('/admin')} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isNewPost ? 'Publish Post' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
