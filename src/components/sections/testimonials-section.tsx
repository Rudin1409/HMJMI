
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { testimonials } from '@/data/site-data';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-16 md:py-24 overflow-hidden bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <Badge variant="default" className="bg-pink-100 text-primary mb-2 dark:bg-primary/10">Testimoni</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Kisah dari <span className="text-primary">Komunitas Kami</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Dengarkan pengalaman dan cerita inspiratif dari para alumni dan anggota aktif HMJ MI yang telah merasakan dampaknya secara langsung.
          </p>
        </div>
      </div>
      <div className="group relative flex w-full overflow-x-hidden">
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="flex w-max animate-marquee space-x-4 pr-4 group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
               <div key={index} className="w-[350px] md:w-[400px] py-4 group/item">
                  <Card className="h-full">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <p className="text-6xl text-primary/20 absolute -top-8 left-0 font-serif">“</p>
                        <p className="text-muted-foreground z-10 relative pt-4 min-h-[100px]">
                          {testimonial.text}
                        </p>
                         <p className="text-6xl text-primary/20 absolute -bottom-8 right-0 font-serif rotate-180">“</p>
                      </div>
                      <Avatar className="w-20 h-20 mb-4 border-4 border-pink-100 dark:border-primary/20">
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

    