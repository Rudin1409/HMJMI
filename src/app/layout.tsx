
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Squares from '@/components/squares';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'HMJ MI POLSRI',
    template: `%s - HMJ MI POLSRI`,
  },
  description: 'Website Himpunan Mahasiswa Jurusan Manajemen Informatika Politeknik Negeri Sriwijaya',
  keywords: ['HMJMI', 'Polsri', 'Manajemen Informatika', 'Politeknik Negeri Sriwijaya'],
  icons: {
    icon: '/logo/logohmj.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen text-foreground font-sans antialiased', inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="fixed inset-0 -z-10">
            <Squares />
          </div>
          <div className="relative flex min-h-dvh flex-col bg-transparent">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

    
