'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useCollection, useMemoFirebase, useAuth } from '@/firebase';
import { collection, setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle, Loader2, AlertCircle, Mail, Briefcase, Users as UsersIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { departments, divisions as allDivisions } from '@/data/profile-data';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  departmentId: string;
  divisionId?: string;
  avatar?: string;
}

const userFormSchema = z.object({
  username: z.string().min(3, 'Username harus memiliki setidaknya 3 karakter.'),
  email: z.string().email('Format email tidak valid.'),
  password: z.string().min(6, 'Password harus memiliki setidaknya 6 karakter.'),
  departmentId: z.string({ required_error: 'Departemen harus dipilih.' }),
  divisionId: z.string().optional(),
});

type UserFormData = z.infer<typeof userFormSchema>;


function AddUserForm({ setDialogOpen }: { setDialogOpen: (open: boolean) => void }) {
  const auth = useAuth();
  const firestore = useFirestore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      departmentId: undefined,
      divisionId: undefined,
    },
  });

  const departmentId = form.watch('departmentId');
  const availableDivisions = departmentId ? allDivisions[departmentId as keyof typeof allDivisions] || [] : [];

  async function onSubmit(values: UserFormData) {
    if (!auth || !firestore) {
      setError("Firebase tidak terinisialisasi.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // 1. Create user in Auth
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // 2. Create user profile in Firestore
      const userProfileData = {
        uid: user.uid,
        username: values.username,
        email: values.email,
        departmentId: values.departmentId,
        divisionId: values.divisionId || null,
        avatar: `https://placehold.co/100x100.png?text=${values.username.charAt(0)}`
      };
      await setDoc(doc(firestore, "users", user.uid), userProfileData);

      setDialogOpen(false); // Close dialog on success
      form.reset();
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email ini sudah terdaftar.');
      } else {
        setError(err.message || "Terjadi kesalahan saat membuat pengguna.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Gagal Menambahkan Pengguna</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="cth. johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="user@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Minimal 6 karakter" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departemen</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih departemen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept.id} value={dept.id}>{dept.fullName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {availableDivisions.length > 0 && (
          <FormField
            control={form.control}
            name="divisionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Divisi</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih divisi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableDivisions.map(div => (
                      <SelectItem key={div.id} value={div.id}>{div.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <DialogFooter className='pt-4'>
            <DialogClose asChild>
                <Button type="button" variant="secondary">Batal</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Tambah Pengguna
            </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}


export default function AdminUsersPage() {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const usersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'users');
  }, [firestore]);

  const { data: users, isLoading: isUsersLoading, error: usersError } = useCollection<UserProfile>(usersQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const getDepartmentName = (id: string) => departments.find(d => d.id === id)?.fullName || 'Tidak diketahui';
  const getDivisionName = (deptId: string, divId: string) => {
    const deptDivisions = allDivisions[deptId as keyof typeof allDivisions] || [];
    return deptDivisions.find(d => d.id === divId)?.name || 'Tidak diketahui';
  }


  if (isUserLoading || !user) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manajemen Pengguna</h1>
          <p className="text-muted-foreground">Kelola pengguna yang terdaftar di sistem.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Tambah Pengguna
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                    <DialogDescription>
                        Isi detail di bawah ini untuk membuat akun pengguna baru.
                    </DialogDescription>
                </DialogHeader>
                <AddUserForm setDialogOpen={setDialogOpen} />
            </DialogContent>
        </Dialog>
      </div>

      {isUsersLoading && (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      {usersError && (
        <div className="text-destructive-foreground bg-destructive p-4 rounded-md flex items-center gap-4">
          <AlertCircle />
          <p>Error fetching users: {usersError.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!isUsersLoading && users && users.map(u => (
          <Card key={u.id}>
            <CardContent className="p-6 flex items-start gap-4">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src={u.avatar} alt={u.username} />
                <AvatarFallback>{u.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-grow space-y-1">
                <h3 className="text-lg font-bold text-foreground">{u.username}</h3>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4"/>
                    <span>{u.email}</span>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Briefcase className="h-4 w-4"/>
                    <span>{getDepartmentName(u.departmentId)}</span>
                </div>
                {u.divisionId && (
                     <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <UsersIcon className="h-4 w-4"/>
                        <span>{getDivisionName(u.departmentId, u.divisionId)}</span>
                    </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
       {!isUsersLoading && (!users || users.length === 0) && (
        <Card>
            <CardContent className="p-10 text-center text-muted-foreground">
                Belum ada pengguna yang terdaftar.
            </CardContent>
        </Card>
      )}
    </div>
  );
}
