'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const allImages = [
  { src: 'https://placehold.co/800x600', alt: 'Pelantikan Anggota Baru', tags: ['pelantikan', 'gathering'] },
  { src: 'https://placehold.co/800x601', alt: 'Workshop Coding', tags: ['workshop', 'coding'] },
  { src: 'https://placehold.co/800x602', alt: 'Seminar Nasional', tags: ['seminar', 'nasional'] },
  { src: 'https://placehold.co/800x603', alt: 'Kunjungan Industri', tags: ['kunjungan', 'industri'] },
  { src: 'https://placehold.co/800x604', alt: 'Bakti Sosial', tags: ['bakti sosial', 'sosial'] },
  { src: 'https://placehold.co/800x605', alt: 'Perlombaan 17 Agustus', tags: ['lomba', 'agustus'] },
];

export function GallerySection() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredImages = useMemo(() => {
    if (!searchTerm) return allImages;
    return allImages.filter(img => 
      img.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      img.alt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <section id="galeri" className="w-full bg-background py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Galeri Kegiatan
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Momen-momen tak terlupakan yang terekam dalam dokumentasi kegiatan kami.
          </p>
        </div>
        
        <div className="relative mx-auto mt-8 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari momen... (e.g., workshop, lomba)"
            className="w-full rounded-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mt-12">
          {filteredImages.length > 0 ? (
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {filteredImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="group overflow-hidden">
                        <CardContent className="relative aspect-video p-0">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 group-hover:scale-110"
                            data-ai-hint={image.tags.join(' ')}
                          />
                          <div className="absolute inset-0 bg-black/20" />
                          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="font-semibold text-white">{image.alt}</h3>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          ) : (
            <div className="py-16 text-center text-muted-foreground">
              <p>Momen yang Anda cari tidak ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
