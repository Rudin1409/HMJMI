
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function CtaSection() {
  return (
    <section id="cta" className="w-full py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="relative bg-primary text-primary-foreground rounded-2xl overflow-visible">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 lg:p-16">
            
            {/* Spacer for image on desktop */}
            <div className="hidden md:block md:w-1/3 lg:w-2/5"></div>

            {/* Text & Button Section */}
            <div className="w-full md:w-2/3 lg:w-3/5 relative z-10 text-center md:text-left">
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
          
          {/* Image Section */}
          <div className="md:absolute md:left-0 md:-bottom-8 w-full md:w-1/3 lg:w-[35%] flex justify-center md:justify-start -mt-24 md:mt-0">
            <div className="relative w-[250px] sm:w-[300px] md:w-auto">
              <Image 
                  src="/hand-iphone.png"
                  width={400}
                  height={600}
                  alt="Hand holding phone with Instagram profile"
                  className="drop-shadow-2xl w-full h-auto"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
