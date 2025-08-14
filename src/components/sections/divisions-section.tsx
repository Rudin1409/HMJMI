import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, HeartHandshake, Megaphone, Users, Lightbulb, Briefcase } from 'lucide-react';

const divisions = [
  {
    icon: <HeartHandshake className="h-10 w-10 text-accent" />,
    title: 'Badan Pengurus Harian (BPH)',
    description: 'Bertanggung jawab atas koordinasi dan pengelolaan umum organisasi.',
  },
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: 'Pengembangan Sumber Daya Manusia (PSDM)',
    description: 'Fokus pada pengembangan soft skill dan hard skill anggota.',
  },
  {
    icon: <Megaphone className="h-10 w-10 text-accent" />,
    title: 'Hubungan Masyarakat (Humas)',
    description: 'Menjalin komunikasi dan relasi dengan pihak internal dan eksternal.',
  },
  {
    icon: <Code2 className="h-10 w-10 text-accent" />,
    title: 'Riset dan Teknologi (Ristek)',
    description: 'Wadah untuk inovasi, riset, dan pengembangan teknologi informasi.',
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-accent" />,
    title: 'Minat dan Bakat (Minbak)',
    description: 'Mengembangkan potensi anggota di bidang non-akademik.',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-accent" />,
    title: 'Kewirausahaan (KWU)',
    description: 'Mendorong jiwa kewirausahaan dan kemandirian finansial anggota.',
  },
];

export function DivisionsSection() {
  return (
    <section id="divisi" className="w-full py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Divisi & Program Kerja
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Kenali lebih dekat divisi-divisi yang menjadi motor penggerak HMJMI.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {divisions.map((division, index) => (
            <Card
              key={index}
              className="group transform-gpu overflow-hidden border-border/40 bg-background/50 text-center shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 backdrop-blur-sm"
            >
              <CardHeader className="items-center">
                <div className="rounded-full bg-accent/10 p-4 transition-colors duration-300 group-hover:bg-accent/20">
                  {division.icon}
                </div>
                <CardTitle className="mt-4">{division.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{division.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
