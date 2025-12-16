
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import Squares from '@/components/squares';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Squares />
      </div>
      <div className="relative flex min-h-dvh flex-col bg-transparent">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
