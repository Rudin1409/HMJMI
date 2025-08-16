
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const testimonials = [
  {
    name: 'Alumni MI 2020',
    role: 'Ketua Himpunan 2019-2020',
    avatar: 'https://placehold.co/100x100',
    text: 'Menjadi Ketua HMJMI adalah salah satu pengalaman paling berharga. Saya belajar tentang kepemimpinan, tanggung jawab, dan kerja sama tim yang nyata.',
  },
  {
    name: 'Alumni MI 2021',
    role: 'Sekretaris Umum 2020-2021',
    avatar: 'https://placehold.co/100x100',
    text: 'Bergabung dengan HMJMI adalah keputusan terbaik. Saya tidak hanya mendapatkan relasi yang luas, tetapi juga pengalaman baru yang tak ternilai harganya.',
  },
  {
    name: 'Pengurus Aktif',
    role: 'Kepala Dept. Akademik',
    avatar: 'https://placehold.co/100x100',
    text: 'Di HMJMI, saya merasakan bagaimana riset dan inovasi berpadu, menantang batas konvensional dan mengubah ide menjadi karya nyata.',
  },
  {
    name: 'Alumni MI 2019',
    role: 'Software Engineer',
    avatar: 'https://placehold.co/100x100',
    text: 'HMJMI adalah tempat terbaik untuk tumbuh. Keterampilan yang saya pelajari di sini sangat relevan dan membantu saya di dunia kerja profesional.',
  },
];


export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-16 md:py-24 bg-pink-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <Badge variant="default" className="bg-pink-100 text-primary mb-2">Testimoni</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Apa Kata Mereka
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Dengarkan pengalaman dan cerita inspiratif dari para alumni dan anggota aktif HMJMI yang telah merasakan dampaknya secara langsung.
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 0,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <div className="p-1">
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
                        <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-primary">{testimonial.role}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

      </div>
    </section>
  );
}
