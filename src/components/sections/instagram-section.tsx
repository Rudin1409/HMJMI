
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
                @hmjmi.polsri
             </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Ikuti kami di Instagram untuk update terbaru dan aktivitas seru!
            </h2>
            <p className="text-white/80 max-w-lg">
              Tetap terhubung dengan HMJMI POLSRI dan jangan lewatkan acara menarik, workshop, dan sorotan komunitas kami.
            </p>
            <Button asChild variant="secondary" size="lg" className="bg-white text-pink-500 hover:bg-gray-100 rounded-full">
              <Link href="#">Ikuti Kami <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="relative h-full min-h-[450px]">
             <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl transform -rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105"></div>
             <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-3xl transform rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-105"></div>
             <div className="relative z-10 p-2 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl h-full border border-white/20">
                <div className="flex items-center justify-between mb-4 px-4 pt-2">
                   <div className="flex items-center gap-3">
                     <Image src="https://placehold.co/40x40" width={40} height={40} alt="HMJMI Logo" className="rounded-full border-2 border-pink-200" data-ai-hint="logo" />
                     <span className="font-semibold text-gray-800">hmjmi.polsri</span>
                   </div>
                   <div className="text-gray-800 font-bold">...</div>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                    <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden">
                        <Image src="https://placehold.co/300x300.png" layout="fill" objectFit="cover" alt="Instagram Post 1" data-ai-hint="student organization event" className="transition-transform duration-500 hover:scale-110"/>
                    </div>
                    <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden">
                        <Image src="https://placehold.co/300x300.png" layout="fill" objectFit="cover" alt="Instagram Post 2" data-ai-hint="coding workshop" className="transition-transform duration-500 hover:scale-110"/>
                    </div>
                    <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden">
                        <Image src="https://placehold.co/600x300.png" layout="fill" objectFit="cover" alt="Instagram Post 3" data-ai-hint="university competition" className="transition-transform duration-500 hover:scale-110"/>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
