
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, Code, Users, Rocket, Target } from 'lucide-react';

const stats = [
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: 'Est. 2008',
    description: '15+ years of excellence in nurturing tech talents',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: '7 Departments',
    description: 'Specialized divisions for comprehensive development',
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: '11 Divisions',
    description: 'Focused teams for targeted skill development',
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: '20+ Programs',
    description: 'Diverse range of activities and initiatives',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="w-full bg-pink-50/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <Badge variant="default" className="bg-pink-100 text-primary mb-4">
            About HMIF
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            About <span className="text-primary">HMIF</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Himpunan Mahasiswa Informatika adalah sebuah Organisasi Kemahasiswaan khusus Jurusan Teknik Informatika yang bergerak dalam bidang Akademik maupun Non-Akademik yang dapat menjadi wadah bagi para Mahasiswa Jurusan Teknik Informatika.
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
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">Menjadi wadah pengembangan potensi mahasiswa Teknik Informatika yang berkualitas, inovatif, dan berdaya saing global melalui kegiatan akademik dan non-akademik yang terstruktur dan berkelanjutan.</p>
                </div>
            </Card>
            <Card className="p-8 shadow-lg rounded-2xl bg-white relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-50 rounded-full"></div>
                 <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">Membangun generasi teknologi yang unggul, berkarakter, dan berkontribusi positif bagi perkembangan teknologi informasi di Indonesia melalui berbagai program dan kegiatan yang bermanfaat.</p>
                </div>
            </Card>
        </div>

      </div>
    </section>
  );
}
