
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import React from 'react';

const testimonials = [
  {
    name: 'Alumni MI 2020',
    role: 'Ketua Himpunan 2019-2020',
    avatar: 'https://placehold.co/100x100.png',
    text: 'Menjadi Ketua HMJMI adalah salah satu pengalaman paling berharga. Saya belajar tentang kepemimpinan, tanggung jawab, dan kerja sama tim yang nyata.',
  },
  {
    name: 'Alumni MI 2021',
    role: 'Sekretaris Umum 2020-2021',
    avatar: 'https://placehold.co/100x100.png',
    text: 'Bergabung dengan HMJMI adalah keputusan terbaik. Saya tidak hanya mendapatkan relasi yang luas, tetapi juga pengalaman baru yang tak ternilai harganya.',
  },
  {
    name: 'Pengurus Aktif',
    role: 'Kepala Dept. Akademik',
    avatar: 'https://placehold.co/100x100.png',
    text: 'Di HMJMI, saya merasakan bagaimana riset dan inovasi berpadu, menantang batas konvensional dan mengubah ide menjadi karya nyata.',
  },
  {
    name: 'Alumni MI 2019',
    role: 'Software Engineer',
    avatar: 'https://placehold.co/100x100.png',
    text: 'HMJMI adalah tempat terbaik untuk tumbuh. Keterampilan yang saya pelajari di sini sangat relevan dan membantu saya di dunia kerja profesional.',
  },
  {
    name: 'Mahasiswa MI 2022',
    role: 'Anggota Aktif',
    avatar: 'https://placehold.co/100x100.png',
    text: 'Kegiatan dan program kerja di HMJMI sangat membantu saya dalam mengembangkan soft skill dan mempersiapkan diri untuk karir masa depan di industri teknologi.',
  },
];


export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <Badge variant="default" className="bg-pink-100 text-primary mb-2">Testimoni</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Kisah dari <span className="text-primary">Komunitas Kami</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Dengarkan pengalaman dan cerita inspiratif dari para alumni dan anggota aktif HMJMI yang telah merasakan dampaknya secara langsung.
          </p>
        </div>
      </div>
      <div className="group relative flex w-full overflow-x-hidden">
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="flex w-max animate-marquee space-x-4 pr-4 group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
               <div key={index} className="w-[350px] md:w-[400px] py-4">
                  <Card className="h-full bg-card/80 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-110">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <p className="text-6xl text-primary/20 absolute -top-8 left-0 font-serif">“</p>
                        <p className="text-muted-foreground z-10 relative pt-4 min-h-[100px]">
                          {testimonial.text}
                        </p>
                         <p className="text-6xl text-primary/20 absolute -bottom-8 right-0 font-serif rotate-180">“</p>
                      </div>
                      <Avatar className="w-20 h-20 mb-4 border-4 border-pink-100">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="headshot portrait" />
                        <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-primary">{testimonial.role}</p>
                    </CardContent>
                  </Card>
                </div>
            ))}
          </div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
      </div>
    </section>
  );
}
