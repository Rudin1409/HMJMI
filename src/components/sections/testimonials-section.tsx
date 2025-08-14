'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const testimonials = [
  {
    name: 'M Dzawil Fadhol A.',
    role: 'Ketua Himpunan Mahasiswa Informatika',
    avatar: 'https://placehold.co/100x100',
    text: 'Menjadi Ketua HMIF Universitas Sriwijaya selama satu periode jadi salah satu pengalaman paling berkesan. Banyak hal yang saya pela... read more',
  },
  {
    name: 'Vellanindhita',
    role: 'Sekretaris Umum 2',
    avatar: 'https://placehold.co/100x100',
    text: 'Merupakan keputusan tepat bagi saya untuk bergabung dengan HMIF. Tidak hanya mendapat relasi yang luas tetapi juga pengalaman baru... read more',
  },
  {
    name: 'Zidjian Vito',
    role: 'Kepala Dinas Akademik',
    avatar: 'https://placehold.co/100x100',
    text: 'Di HMIF UNSRI, saya merasakan bagaimana riset dan inovasi berpadu dalam harmoni, menantang batas konvensional dan mengubah gagasan... read more',
  },
  {
    name: 'Alumni Lain',
    role: 'Software Engineer',
    avatar: 'https://placehold.co/100x100',
    text: 'HMIF tempat terbaik untuk berkembang. Saya belajar banyak hal yang sangat berguna di dunia kerja. Sangat direkomendasikan... read more',
  },
];


export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-16 md:py-24 bg-pink-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <Badge variant="default" className="bg-pink-100 text-primary mb-2">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            What They Say
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Dengarkan pengalaman dan cerita dari para alumni HMIF yang telah sukses dalam karir mereka
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                  <Card className="h-full bg-white shadow-lg rounded-xl overflow-hidden">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <p className="text-6xl text-primary/20 absolute -top-8 left-0 font-serif">“</p>
                        <p className="text-muted-foreground z-10 relative pt-4">
                          {testimonial.text}
                        </p>
                         <p className="text-6xl text-primary/20 absolute -bottom-8 right-0 font-serif rotate-180">“</p>
                      </div>
                      <Avatar className="w-20 h-20 mb-4 border-4 border-pink-100">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-primary">{testimonial.role}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>

      </div>
    </section>
  );
}
