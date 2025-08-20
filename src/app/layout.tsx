import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'HMJMI POLSRI',
    template: `%s - HMJMI POLSRI`,
  },
  description: 'Website Himpunan Mahasiswa Jurusan Manajemen Informatika Politeknik Negeri Sriwijaya',
  keywords: ['HMJMI', 'Polsri', 'Manajemen Informatika', 'Politeknik Negeri Sriwijaya'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <div className="relative flex min-h-dvh flex-col bg-transparent">
          <div className="absolute top-0 left-0 -z-10 h-full w-full">
            <div className="absolute top-0 left-0 h-full w-full bg-background">
              <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-blob-1"></div>
              <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px] animate-blob-2"></div>
            </div>
          </div>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
