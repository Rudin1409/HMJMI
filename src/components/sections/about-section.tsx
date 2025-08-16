
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, Code, Users } from 'lucide-react';

const stats = [
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: 'Berdiri Sejak 2002',
    description: '20+ tahun keunggulan dalam membina talenta teknologi.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: '8 Departemen',
    description: 'Divisi khusus untuk pengembangan komprehensif.',
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: '11 Divisi',
    description: 'Tim yang fokus untuk pengembangan keterampilan yang ditargetkan.',
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: '25+ Program',
    description: 'Beragam kegiatan dan inisiatif yang inovatif.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="w-full bg-pink-50/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <Badge variant="default" className="bg-pink-100 text-primary mb-4">
            Tentang HMJMI
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Mengenal <span className="text-primary">HMJMI</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Himpunan Mahasiswa Jurusan Manajemen Informatika adalah organisasi kemahasiswaan yang menjadi wadah bagi mahasiswa untuk berinovasi, berkreasi, dan mengembangkan potensi di bidang teknologi informasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 shadow-md hover:shadow-lg transition-shadow bg-white rounded-xl">
              <CardContent className="flex flex-col items-center gap-4 p-0">
                <div className="bg-pink-100 p-4 rounded-full">
                   {stat.icon}
                </div>
                <h3 className="text-xl font-bold">{stat.title}</h3>
                <p className="text-muted-foreground text-sm">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 shadow-lg rounded-2xl bg-white relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-50 rounded-full"></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Misi Kami</h3>
                    <p className="text-muted-foreground">Mewujudkan HMJ Manajemen Informatika sebagai organisasi yang SMART (Solid, Melayani, Aktif, Responsif, dan Terdampak) dalam berekspresi, berkreasi, dan berprestasi.</p>
                </div>
            </Card>
            <Card className="p-8 shadow-lg rounded-2xl bg-white relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-50 rounded-full"></div>
                 <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Visi Kami</h3>
                    <p className="text-muted-foreground">Menjadikan HMJ Manajemen Informatika sebagai wadah untuk menyalurkan dan mengembangkan potensi mahasiswa yang aktif, kreatif, dan inovatif, serta menjalin hubungan baik di tingkat internal maupun eksternal.</p>
                </div>
            </Card>
        </div>

      </div>
    </section>
  );
}

    