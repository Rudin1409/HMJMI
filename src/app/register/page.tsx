
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function RegisterPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !firestore) {
        setError('Layanan otentikasi tidak tersedia.');
        return;
    };
    setIsLoading(true);
    setError(null);
    if(password.length < 6) {
        setError('Password harus memiliki setidaknya 6 karakter.');
        setIsLoading(false);
        return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Create user profile in Firestore with 'admin' role
      const userProfileData = {
        uid: newUser.uid,
        username: email.split('@')[0], // Default username from email
        email: newUser.email,
        departmentId: 'inti', // Default department
        avatar: `https://placehold.co/100x100.png?text=${email.charAt(0).toUpperCase()}`,
        role: 'admin', // Assign 'admin' role
      };

      await setDoc(doc(firestore, "users", newUser.uid), userProfileData);

      // The useEffect hook will handle redirection
    } catch (err: any) {
       if (err.code === 'auth/email-already-in-use') {
        setError('Email ini sudah terdaftar. Silakan gunakan email lain atau login.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Format email tidak valid.');
      } else {
        setError(err.message || 'Terjadi kesalahan saat registrasi.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isUserLoading || (!isUserLoading && user)) {
     return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
           <div className="mx-auto mb-4">
              <Link href="/" className="flex items-center justify-center space-x-2">
                <Image src="/logo/logohmj.png" width={48} height={48} alt="HMJ MI POLSRI Logo" className="h-12 w-12" />
              </Link>
            </div>
          <CardTitle className="text-2xl">Buat Akun Admin</CardTitle>
          <CardDescription>Daftarkan akun baru untuk mengelola konten website.</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="grid gap-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Registrasi Gagal</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                placeholder="Minimal 6 karakter"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
              {isLoading ? 'Mendaftar...' : 'Daftar'}
            </Button>
             <p className="text-xs text-muted-foreground">
                Sudah punya akun?{' '}
                <Link href="/login" className="underline text-primary hover:text-primary/80">
                    Login di sini
                </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
