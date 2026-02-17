
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { PremiumBackground } from '@/components/premium-background';
import { SmoothScroll } from '@/components/smooth-scroll';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <PremiumBackground />
      </div>
      {/* SiteHeader MUST be outside SmoothScroll to keep position:fixed working */}
      <SiteHeader />
      <SmoothScroll>
        <div className="relative flex min-h-dvh flex-col bg-transparent">
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </SmoothScroll>
    </>
  );
}
