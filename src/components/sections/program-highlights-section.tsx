
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
    image: '/Galeri/IT-fest.jpg',
    hint: 'tech competition stage',
  },
  {
    title: 'Seminar Bisnis',
    category: 'Edukasi & Wawasan',
    image: '/Galeri/Sembis.jpg',
    hint: 'business seminar',
  },
];

export function ProgramHighlightsSection() {
  return (
    <section id="program-highlights" className="w-full py-20 md:py-32 bg-transparent relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-primary/50 text-slate-900 dark:text-white mb-6 py-1.5 px-4 font-semibold text-sm backdrop-blur-md bg-white/30 dark:bg-white/10">
            Aktivitas Unggulan
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Dari <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600 animate-gradient-x">Teori</span> ke <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-600 to-purple-700 animate-gradient-x">Aksi</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-200 mt-4 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Kami mengubah pengetahuan menjadi pengalaman nyata melalui berbagai program berdampak yang dirancang untuk masa depan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {highlightedPrograms.map((program, index) => (
            <Card key={index} className="relative overflow-hidden group border-white/40 dark:border-white/10 bg-white/30 dark:bg-black/40 backdrop-blur-md hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-2 hover:border-primary/30">
              {/* Ornaments */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/20 transition-all duration-700" />

              <CardContent className="p-0 relative z-10 flex flex-col h-full">
                <div className="relative aspect-video overflow-hidden rounded-t-[calc(var(--radius)-1px)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  <Image
                    src={program.image}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 ease-out"
                    alt={program.title}
                    data-ai-hint={program.hint}
                  />
                  {/* Floating Action Button on Image */}
                  <div className="absolute bottom-4 right-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md p-3 rounded-full text-primary shadow-lg hover:scale-110 transition-transform cursor-pointer">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col gap-4 flex-grow">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="bg-white/50 dark:bg-white/10 text-slate-900 dark:text-white border-white/20 backdrop-blur-sm group-hover:bg-primary/20 transition-colors">
                      {program.category}
                    </Badge>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                    {program.title}
                  </h3>

                  {/* Subtle animated bar */}
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:w-24 transition-all duration-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-16">
          <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-xl shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105">
            <Link href="/proker">
              Lihat Semua Program <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
