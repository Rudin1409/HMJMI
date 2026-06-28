
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const { user, isUserLoading, refreshUser } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);

  const MAX_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 15 * 60 * 1000;

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    const stored = localStorage.getItem('loginAttempts');
    const lockout = localStorage.getItem('lockoutUntil');
    if (stored) setLoginAttempts(parseInt(stored));
    if (lockout) {
      const until = parseInt(lockout);
      if (Date.now() < until) {
        setLockoutUntil(until);
      } else {
        localStorage.removeItem('lockoutUntil');
        localStorage.removeItem('loginAttempts');
      }
    }
    // Load remembered email
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 60000);
      setError(`Terlalu banyak percobaan login. Coba lagi dalam ${remaining} menit.`);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await api.login(email, password);
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('lockoutUntil');
      setLoginAttempts(0);
      setLockoutUntil(null);
      // Save or clear remembered email
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      if (refreshUser) await refreshUser();
    } catch (err: any) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem('loginAttempts', newAttempts.toString());
      if (newAttempts >= MAX_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_DURATION;
        setLockoutUntil(until);
        localStorage.setItem('lockoutUntil', until.toString());
        setError(`Terlalu banyak percobaan login gagal. Akun dikunci selama 15 menit.`);
      } else {
        setError(err.message || 'Email atau password salah.');
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
    <div className="flex min-h-screen w-full bg-slate-950">

      {/* ─── LEFT PANEL: Form ─── */}
      <div className="relative flex w-full flex-col justify-between lg:w-1/2 px-6 sm:px-12 lg:px-16 py-8">

        {/* Logo top-left — links to home */}
        <Link href="/" className="inline-flex items-center gap-2.5 group w-fit">
          <Image src="/logo/logohmj.png" width={36} height={36} alt="HMJ MI" className="h-9 w-9 transition-transform group-hover:scale-110" />
          <span className="text-sm font-bold text-white tracking-wide">HMJ MI</span>
        </Link>

        {/* Centered Form */}
        <div className="mx-auto w-full max-w-sm flex-1 flex flex-col justify-center py-12">
          <div className="space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">Masuk ke akun Anda</h1>
            <p className="text-sm text-white/40">Masukkan email dan kata sandi untuk mengakses dashboard.</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6 border-red-500/30 bg-red-500/10 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/60 text-xs font-medium uppercase tracking-wider">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="h-11 pl-10 bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-primary/20 rounded-lg transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/60 text-xs font-medium uppercase tracking-wider">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="h-11 pl-10 pr-11 bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-primary/20 rounded-lg transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/30 cursor-pointer accent-primary"
              />
              <label htmlFor="remember" className="text-xs text-white/40 cursor-pointer select-none hover:text-white/60 transition-colors">
                Ingat saya
              </label>
            </div>

            {/* Submit */}
            <Button
              className="w-full h-11 rounded-lg text-sm font-semibold bg-white text-slate-950 hover:bg-white/90 border-0 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Memproses...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-[11px] text-white/20 tracking-wide">
          © {new Date().getFullYear()} HMJ MI POLSRI
        </p>
      </div>

      {/* ─── RIGHT PANEL: Branding ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-950/60 to-slate-900" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        {/* Animated Orbs */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-pink-600/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

        {/* Floating Dots */}
        <div className="absolute top-16 right-20 w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="absolute top-32 left-16 w-1 h-1 rounded-full bg-white/10" />
        <div className="absolute bottom-20 right-32 w-1 h-1 rounded-full bg-white/15" />
        <div className="absolute bottom-40 left-24 w-1.5 h-1.5 rounded-full bg-white/10" />

        {/* Content */}
        <div className="relative z-10 text-center space-y-8 max-w-md px-8">
          {/* Logo Icon */}
          <div className="mx-auto w-20 h-20 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl shadow-primary/5">
            <Image src="/logo/logohmj.png" width={52} height={52} alt="HMJ MI" className="h-13 w-13" />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Selamat Datang!
            </h2>
            <p className="text-base text-white/40 leading-relaxed">
              Masuk ke akun Anda dan kelola<br />
              seluruh fitur <span className="text-primary font-medium">HMJ MI POLSRI</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
