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
              Follow us on Instagram for the latest updates and fun activities!
            </h2>
            <p className="text-white/80 max-w-lg">
              Stay connected with HMJMI POLSRI and never miss our exciting events, workshops, and community highlights.
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-pink-500 hover:bg-gray-100 rounded-full">
              Follow Us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div>
            <Card className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4 px-2">
                   <div className="flex items-center gap-2">
                     <Image src="https://placehold.co/40x40" width={40} height={40} alt="HMJMI Logo" className="rounded-full" data-ai-hint="logo" />
                     <span className="font-semibold text-gray-800">hmjmi.polsri</span>
                   </div>
                   <div className="text-gray-800 font-bold">...</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                        <Image src="https://placehold.co/200x200" layout="fill" objectFit="cover" alt="Instagram post 1" data-ai-hint="student organization event" />
                    </div>
                     <div className="aspect-square relative rounded-lg overflow-hidden">
                        <Image src="https://placehold.co/200x200" layout="fill" objectFit="cover" alt="Instagram post 2" data-ai-hint="coding workshop" />
                    </div>
                     <div className="aspect-square relative rounded-lg overflow-hidden">
                        <Image src="https://placehold.co/200x200" layout="fill" objectFit="cover" alt="Instagram post 3" data-ai-hint="university competition" />
                    </div>
                     <div className="aspect-square relative rounded-lg overflow-hidden">
                        <Image src="https://placehold.co/200x200" layout="fill" objectFit="cover" alt="Instagram post 4" data-ai-hint="community gathering" />
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
