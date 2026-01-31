
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { AuroraBackground } from '@/components/aurora-background';
import { SmoothScroll } from '@/components/smooth-scroll';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <AuroraBackground />
      </div>
      <SmoothScroll>
        <div className="relative flex min-h-dvh flex-col bg-transparent">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </SmoothScroll>
    </>
  );
}
