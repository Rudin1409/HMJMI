
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, GraduationCap, Megaphone, Sparkles, HeartHandshake, Store, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ScrollAnimation } from '../scroll-animation';

const departments = [
  { name: 'BPH', fullName: 'Badan Pengurus Harian', icon: <Award className="h-8 w-8 text-white" /> },
  { name: 'PTKP', fullName: 'Perguruan Tinggi & Kepemudaan', icon: <GraduationCap className="h-8 w-8 text-white" /> },
  { name: 'Humas', fullName: 'Hubungan Masyarakat', icon: <Megaphone className="h-8 w-8 text-white" /> },
  { name: 'PSDM', fullName: 'Pengembangan SDM', icon: <Sparkles className="h-8 w-8 text-white" /> },
  { name: 'Kesma', fullName: 'Kesejahteraan Mahasiswa', icon: <HeartHandshake className="h-8 w-8 text-white" /> },
  { name: 'Bistra', fullName: 'Bisnis & Kemitraan', icon: <Store className="h-8 w-8 text-white" /> },
];

export function DivisionsSection() {
  return (
    <section id="divisions" className="w-full py-20 md:py-32 bg-primary/40 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 blur-[30px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <ScrollAnimation>
            <Badge variant="outline" className="border-primary/50 text-slate-900 dark:text-white mb-6 py-1.5 px-4 font-semibold text-sm bg-white/40 dark:bg-white/15">
              Struktur Kami
            </Badge>
          </ScrollAnimation>

          <ScrollAnimation delay={1}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              Fondasi Penggerak <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600">Inovasi</span>
            </h2>
          </ScrollAnimation>

          <ScrollAnimation delay={2}>
            <p className="text-slate-700 dark:text-slate-200 mt-4 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              Kenali departemen-departemen yang menjadi pilar kekuatan kami, masing-masing dengan peran unik dalam mewujudkan visi dan misi organisasi.
            </p>
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {departments.map((dept, index) => (
            <ScrollAnimation key={dept.name} delay={index + 1} className="h-full">
              <Card className="relative h-full overflow-hidden group border-white/40 dark:border-white/10 bg-white/40 dark:bg-black/50 hover:bg-white/55 dark:hover:bg-white/10 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10">
                {/* Ornaments */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-600/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-primary/50 rounded-tr opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-primary/50 rounded-bl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100" />

                <CardContent className="flex flex-col items-center gap-5 p-6 relative z-10 text-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 text-white">
                    {dept.icon}
                  </div>
                  <div className="space-y-1 w-full">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{dept.name}</h3>
                    <p className="text-slate-700 dark:text-slate-300 text-xs hidden sm:block leading-tight font-medium opacity-80 group-hover:opacity-100 transition-opacity">{dept.fullName}</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        <div className="text-center mt-16">
          <ScrollAnimation delay={3}>
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-xl shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105">
              <Link href="/profile">
                Lihat Struktur Lengkap <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
