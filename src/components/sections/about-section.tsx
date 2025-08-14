
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, Code, Users } from 'lucide-react';

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
    <section id="about" className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>
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
              <CardContent className="flex flex-col items-center gap-4">
                <div className="bg-pink-100 p-4 rounded-full">
                   {stat.icon}
                </div>
                <h3 className="text-xl font-bold">{stat.title}</h3>
                <p className="text-muted-foreground text-sm">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <Image src="https://placehold.co/600x450" layout="fill" objectFit="cover" alt="HMIF Team" data-ai-hint="student group photo" />
            </div>
            <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Membangun Generasi Digital yang Unggul</h3>
                <p className="text-muted-foreground">
                    Sebagai organisasi mahasiswa, HMIF berkomitmen untuk mengembangkan potensi mahasiswa informatika melalui berbagai program yang inovatif dan relevan dengan perkembangan teknologi terkini. Kami percaya bahwa kolaborasi, inovasi, dan pembelajaran berkelanjutan adalah kunci untuk mempersiapkan mahasiswa menghadapi tantangan di era digital.
                </p>
            </div>
        </div>

      </div>
    </section>
  );
}
