'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Calendar, Award } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-gradient-to-r from-blue-50 to-white">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <Badge variant="secondary" className="bg-pink-100 text-primary mb-4 py-1 px-3">
              Welcome to HMIF UNSRI <ArrowRight className="ml-2 h-4 w-4" />
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Empowering Future <br />
              <span className="text-pink-500">Tech Leaders</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Himpunan Mahasiswa Informatika Universitas Sriwijaya - Wadah
              kreativitas, inovasi, dan pengembangan potensi mahasiswa
              informatika dalam menghadapi era digital.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Explore Programs
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Learn More
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4 text-center">
              <div>
                <Users className="h-7 w-7 mx-auto text-primary mb-2" />
                <p className="font-bold text-xl">100+</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
              <div>
                <Calendar className="h-7 w-7 mx-auto text-primary mb-2" />
                <p className="font-bold text-xl">20+</p>
                <p className="text-sm text-muted-foreground">Annual Events</p>
              </div>
              <div>
                <Award className="h-7 w-7 mx-auto text-primary mb-2" />
                <p className="font-bold text-xl">15+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-full min-h-[450px]">
            <div className="absolute -top-4 -left-4 w-full h-full bg-pink-400 rounded-3xl transform -rotate-3"></div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-400 rounded-3xl transform rotate-3"></div>
            <div className="relative z-10 p-2 bg-white rounded-3xl shadow-2xl h-full">
                <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                    <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden">
                        <Image src="https://placehold.co/600x300" layout="fill" objectFit="cover" alt="Group photo 1" data-ai-hint="university student group" />
                    </div>
                    <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden">
                        <Image src="https://placehold.co/300x300" layout="fill" objectFit="cover" alt="Group photo 2" data-ai-hint="students coding event" />
                    </div>
                    <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden">
                        <Image src="https://placehold.co/300x300" layout="fill" objectFit="cover" alt="Group photo 3" data-ai-hint="classroom presentation" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
