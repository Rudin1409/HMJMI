
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function CtaSection() {
  return (
    <section id="cta" className="w-full py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="relative bg-primary text-primary-foreground rounded-2xl overflow-visible">
          <div className="grid md:grid-cols-2 items-center">
            <div className="relative h-64 md:h-96 -mb-20 md:mb-0">
               <div className="absolute bottom-0 left-4 md:left-12 w-[250px] md:w-[320px] h-auto">
                    <Image 
                        src="https://placehold.co/400x600.png"
                        width={400}
                        height={600}
                        alt="Hand holding phone"
                        data-ai-hint="hand holding phone"
                        className="drop-shadow-2xl"
                    />
               </div>
            </div>
            <div className="relative z-10 p-8 md:p-12 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Ikuti Kami di Media Sosial!
                </h2>
                <p className="mt-4 mb-6 text-primary-foreground/80">
                    Dapatkan pembaruan terbaru, info acara, dan berbagai peluang eksklusif dengan mengikuti akun Instagram kami.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                     <Button asChild size="lg" variant="secondary" className="rounded-full bg-white text-primary hover:bg-white/90">
                        <Link href="https://www.instagram.com/hmjmi.polsri/" target="_blank" rel="noopener noreferrer">
                            <Instagram className="mr-2 h-5 w-5" /> Kunjungi Instagram
                        </Link>
                    </Button>
                    <div className="font-semibold text-primary-foreground/90">@hmjmi.polsri</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
