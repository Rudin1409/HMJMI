import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, GraduationCap, Megaphone, Sparkles, HeartHandshake, Store, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const departments = [
  { name: 'BPH', fullName: 'Badan Pengurus Harian', icon: <Award className="h-8 w-8 text-primary" /> },
  { name: 'PTKP', fullName: 'Perguruan Tinggi & Kepemudaan', icon: <GraduationCap className="h-8 w-8 text-primary" /> },
  { name: 'Humas', fullName: 'Hubungan Masyarakat', icon: <Megaphone className="h-8 w-8 text-primary" /> },
  { name: 'PSDM', fullName: 'Pengembangan SDM', icon: <Sparkles className="h-8 w-8 text-primary" /> },
  { name: 'Kesma', fullName: 'Kesejahteraan Mahasiswa', icon: <HeartHandshake className="h-8 w-8 text-primary" /> },
  { name: 'Bistra', fullName: 'Bisnis & Kemitraan', icon: <Store className="h-8 w-8 text-primary" /> },
];

export function DivisionsSection() {
  return (
    <section id="divisions" className="w-full py-16 md:py-24 bg-card/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="default" className="bg-pink-100 text-primary mb-4">
            Struktur Kami
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Fondasi Penggerak <span className="text-primary">Inovasi</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Kenali departemen-departemen yang menjadi pilar kekuatan kami, masing-masing dengan peran unik dalam mewujudkan visi dan misi organisasi.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {departments.map((dept) => (
            <Card key={dept.name} className="text-center p-6">
              <CardContent className="flex flex-col items-center gap-4 p-0">
                <div className="bg-pink-100 p-4 rounded-full">
                  {dept.icon}
                </div>
                <h3 className="text-lg font-bold">{dept.name}</h3>
                <p className="text-muted-foreground text-xs hidden sm:block">{dept.fullName}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/profile">
                    Lihat Struktur Lengkap <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
