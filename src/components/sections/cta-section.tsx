
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function CtaSection() {
  return (
    <section id="cta" className="w-full py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="relative bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 lg:p-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Image Section */}
            <div className="w-full md:w-1/2 lg:w-1/3 order-last md:order-first relative mt-16 md:mt-0 h-48 md:h-auto">
              <div className="absolute md:-bottom-28 md:-left-12 lg:-left-24 -bottom-36 left-1/2 -translate-x-1/2 md:translate-x-0 w-[300px] sm:w-[350px] md:w-[400px] h-auto">
                <Image 
                    src="/hand-iphone.png"
                    width={400}
                    height={600}
                    alt="Hand holding phone with Instagram profile"
                    className="drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Text & Button Section */}
            <div className="w-full md:w-1/2 lg:w-2/3 relative z-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                    Ikuti Kami di Media Sosial!
                </h2>
                <p className="mt-4 mb-6 text-primary-foreground/80 max-w-lg mx-auto md:mx-0">
                    Dapatkan pembaruan terbaru, info acara, dan berbagai peluang eksklusif dengan mengikuti akun Instagram kami.
                </p>
                <Button asChild size="lg" variant="secondary" className="rounded-full bg-white text-primary hover:bg-white/90">
                    <Link href="https://www.instagram.com/hmjmi.polsri/" target="_blank" rel="noopener noreferrer">
                        <Instagram className="mr-2 h-5 w-5" /> Kunjungi Instagram
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
