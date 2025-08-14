import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Code, Heart, Lightbulb, PenTool, Users } from 'lucide-react';

const divisions = [
  {
    icon: <Heart className="h-10 w-10 text-primary" />,
    title: 'Badan Pengurus Harian',
    description: 'Bertanggung jawab atas jalannya roda organisasi dan mengkoordinasikan semua departemen.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Hubungan Masyarakat',
    description: 'Menjalin hubungan baik dengan pihak internal maupun eksternal Fakultas Ilmu Komputer.',
  },
  {
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: 'Media dan Informasi',
    description: 'Menyebarkan informasi kegiatan HMIF melalui berbagai media dan platform digital.',
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Riset dan Teknologi',
    description: 'Mewadahi mahasiswa untuk riset, pengembangan teknologi, dan kompetisi akademik.',
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: 'Pengembangan Sumber Daya Manusia',
    description: 'Mengembangkan potensi, soft skill, dan hard skill para anggota himpunan.',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: 'Kewirausahaan',
    description: 'Mengembangkan jiwa wirausaha dan kemandirian finansial anggota himpunan.',
  },
];

export function DivisionsSection() {
  return (
    <section id="divisi" className="w-full bg-secondary py-16 md:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-montserrat text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl">
            DEPARTEMEN
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Kenali lebih dekat departemen yang menjadi motor penggerak HMIF Unsri.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {divisions.map((division, index) => (
            <Card
              key={index}
              className="group transform-gpu overflow-hidden border-border/40 bg-background text-center shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
            >
              <CardHeader className="items-center p-6">
                <div className="rounded-full bg-primary/10 p-4 transition-colors duration-300 group-hover:bg-primary/20">
                  {division.icon}
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <CardTitle className="mb-2 text-xl font-bold">{division.title}</CardTitle>
                <p className="text-muted-foreground">{division.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
