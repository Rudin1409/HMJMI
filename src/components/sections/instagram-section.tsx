
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export function InstagramSection() {
  return (
    <section id="instagram" className="w-full bg-pink-500 text-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative">
         <div className="absolute top-1/2 -left-16 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2"></div>
         <div className="absolute -top-8 right-24 w-20 h-20 bg-white/20 rounded-full"></div>
         <div className="absolute -bottom-12 right-8 w-24 h-24 bg-white/20 rounded-full"></div>
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
             <Badge variant="secondary" className="bg-white/20 text-white rounded-full px-4 py-1">
                @hmjmi_polsri
             </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Ikuti Aktivitas Terbaru Kami di Media Sosial!
            </h2>
            <p className="text-white/80 max-w-lg">
              Tetap terhubung dengan kami melalui Instagram untuk mendapatkan informasi terbaru seputar acara, workshop, dan berbagai momen seru lainnya.
            </p>
            <Button asChild variant="secondary" size="lg" className="bg-white text-pink-500 hover:bg-gray-100 rounded-full">
              <Link href="https://www.instagram.com/hmjmi_polsri/" target="_blank">Kunjungi Instagram <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="relative h-full min-h-[450px] flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-md rounded-2xl overflow-hidden shadow-2xl">
                 <Image src="https://placehold.co/600x600.png" layout="fill" objectFit="cover" alt="Instagram Post" data-ai-hint="student community event" className="transition-transform duration-500 hover:scale-105"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
