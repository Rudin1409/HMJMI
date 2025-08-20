
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const highlightedPrograms = [
  {
    title: 'IT Festival',
    category: 'Kompetisi & Edukasi',
    image: 'https://placehold.co/400x250.png',
    hint: 'tech competition stage',
  },
  {
    title: 'Seminar Bisnis',
    category: 'Edukasi & Wawasan',
    image: 'https://placehold.co/400x250.png',
    hint: 'business seminar',
  },
];

export function ProgramHighlightsSection() {
  return (
    <section id="program-highlights" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="default" className="bg-pink-100 text-primary mb-4">
            Aktivitas Unggulan
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Dari <span className="text-primary">Teori</span> ke <span className="text-primary">Aksi</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Kami mengubah pengetahuan menjadi pengalaman nyata melalui berbagai program berdampak yang dirancang untuk masa depan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {highlightedPrograms.map((program, index) => (
            <Card key={index} className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl bg-card/80 backdrop-blur-sm hover:bg-primary/10">
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden">
                    <Image 
                        src={program.image} 
                        layout="fill" 
                        objectFit="cover" 
                        alt={program.title} 
                        data-ai-hint={program.hint}
                        className="transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-2">{program.category}</Badge>
                  <h3 className="text-xl font-bold text-gray-800">{program.title}</h3>
                </div>
              </CardContent>
               <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-primary/20 rounded-xl rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/proker">
                    Lihat Semua Program <ArrowRight className="ml-2"/>
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
