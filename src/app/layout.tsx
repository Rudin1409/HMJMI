
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { FirebaseClientProvider } from '@/firebase';

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
        <FirebaseClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
            <Toaster />
          </ThemeProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
