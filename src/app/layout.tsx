
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

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
      <body className={cn('min-h-screen text-foreground font-sans antialiased', inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="relative flex min-h-dvh flex-col bg-background">
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
