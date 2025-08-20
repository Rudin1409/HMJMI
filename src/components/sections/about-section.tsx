import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, Code, Users, CheckCircle } from 'lucide-react';

const stats = [
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: 'Didirikan Sejak 2002',
    description: 'Lebih dari 20 tahun mencetak talenta digital.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: '5 Departemen',
    description: 'Kolaborasi lintas bidang untuk hasil optimal.',
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: '11 Divisi Khusus',
    description: 'Fokus pada pengembangan keahlian spesifik.',
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: '15+ Program Kerja',
    description: 'Inisiatif beragam untuk pemberdayaan mahasiswa.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="w-full py-16 md:py-24 bg-primary/35 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <Badge variant="default" className="bg-pink-100 text-primary mb-4 dark:bg-primary/10">
            Jejak Langkah Kami
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
             Merangkai Inovasi, <span className="text-primary">Mencetak Talenta</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Himpunan Mahasiswa Jurusan Manajemen Informatika adalah organisasi kemahasiswaan yang menjadi wadah bagi mahasiswa untuk berinovasi, berkreasi, dan mengembangkan potensi di bidang teknologi informasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="flex flex-col items-center gap-4 p-0">
                <div className="bg-pink-100 dark:bg-primary/10 p-4 rounded-full">
                   {stat.icon}
                </div>
                <h3 className="text-xl font-bold">{stat.title}</h3>
                <p className="text-muted-foreground text-sm">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-50/50 dark:bg-primary/20 rounded-full"></div>
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-pink-100 dark:bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0 mb-4">
                        <CheckCircle className="w-8 h-8"/>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Visi Kami</h3>
                    <p className="text-muted-foreground">Mewujudkan Himpunan Mahasiswa Jurusan Manajemen Informatika yang mengedepankan rasa tanggung jawab, harmoni, kebersamaan, serta menciptakan lingkungan yang inspiratif dan kolaboratif bagi seluruh Mahasiswa/i Manajemen Informatika.</p>
                </div>
            </Card>
            <Card className="p-8">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-50/50 dark:bg-primary/20 rounded-full"></div>
                 <div className="relative z-10">
                    <div className="w-16 h-16 bg-pink-100 dark:bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0 mb-4">
                        <CheckCircle className="w-8 h-8"/>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Misi Kami</h3>
                    <p className="text-muted-foreground">Meningkatkan kepedulian sosial dan religius, mendorong pengembangan kompetensi dan aspirasi, menjadi pusat informasi yang kreatif, mewadahi minat bakat, serta menumbuhkan jiwa kewirausahaan mahasiswa.</p>
                </div>
            </Card>
        </div>

      </div>
    </section>
  );
}

    