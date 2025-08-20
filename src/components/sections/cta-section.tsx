
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';
import Link from 'next/link';

export function CtaSection() {
  return (
    <section id="cta" className="w-full py-16 md:py-24 bg-card/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto p-8 md:p-12 bg-card rounded-2xl shadow-lg text-center overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full"></div>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-primary/10 rounded-full"></div>
            <div className='relative z-10'>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Ikuti Kami di <span className="text-primary">Media Sosial</span>
                </h2>
                <p className="text-muted-foreground mt-4 mb-8 max-w-2xl mx-auto">
                    Dapatkan pembaruan terbaru, info acara, dan berbagai peluang eksklusif dengan mengikuti akun Instagram kami.
                </p>
                <Button asChild size="lg" className="rounded-full">
                    <Link href="https://www.instagram.com/hmjmi.polsri/" target="_blank" rel="noopener noreferrer">
                        <Instagram className="mr-2 h-5 w-5" /> Kunjungi Instagram
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
