
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Calendar, Code, Users, ChevronDown } from 'lucide-react';

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

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section 
        id="hero-about" 
        className="relative w-full bg-gradient-to-b from-pink-100/50 to-white pt-28 pb-16"
      >
        <div className="container mx-auto px-4 text-center">
          <Badge variant="default" className="mb-4 bg-pink-100 text-primary">
            Tentang Kami
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            About <span className="text-primary">Us</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Mengenal lebih dekat Himpunan Mahasiswa Informatika Universitas Sriwijaya dan perjalanan kami dalam membentuk generasi teknologi masa depan.
          </p>
          <div className="mt-8">
            <Button variant="ghost" size="icon" className="rounded-full bg-pink-100 text-primary hover:bg-pink-200">
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      <section id="about-hmif" className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              About <span className="text-primary">HMIF</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-4xl mx-auto">
              Himpunan Mahasiswa Informatika (HMIF) adalah organisasi kemahasiswaan khusus untuk mahasiswa Jurusan Teknik Informatika. Berdiri sejak tahun 2008, HMIF berperan sebagai wadah yang mendukung pengembangan di bidang akademik dan non-akademik, serta menyediakan berbagai kegiatan yang bermanfaat bagi para mahasiswa.
            </p>
            <p className="text-muted-foreground mt-4 max-w-4xl mx-auto">
              HMIF memiliki 7 dinas dengan 11 divisi yang berfokus pada berbagai aspek untuk meningkatkan kompetensi dan kolaborasi mahasiswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </div>
      </section>
      
      <section className="bg-pink-50/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
            <Card className="p-8 shadow-lg rounded-2xl bg-white">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image src="https://placehold.co/600x400" layout="fill" objectFit="cover" alt="HMIF Team" data-ai-hint="university student group" />
                        <div className="absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded-md">
                            <h4 className="font-bold">HMIF Team</h4>
                            <p className="text-sm">Kepengurusan 2025</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">Membangun Generasi Digital yang <span className="text-primary">Unggul</span></h3>
                        <p className="text-muted-foreground mb-4">
                            Sebagai organisasi mahasiswa, HMIF berkomitmen untuk mengembangkan potensi mahasiswa informatika melalui berbagai program yang inovatif dan relevan dengan perkembangan teknologi terkini.
                        </p>
                        <p className="text-muted-foreground">
                            Kami percaya bahwa kolaborasi, inovasi, dan pembelajaran berkelanjutan adalah kunci untuk mempersiapkan mahasiswa menghadapi tantangan di era digital.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
      </section>
      
       <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
            <Card className="p-8 shadow-lg rounded-2xl bg-white">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                     <div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">Visi & Misi <span className="text-primary">Kami</span></h3>
                        <p className="text-muted-foreground mb-4">
                            Menjadi wadah pengembangan potensi mahasiswa Teknik Informatika yang berkualitas, inovatif, dan berdaya saing global melalui kegiatan akademik dan non-akademik yang terstruktur dan berkelanjutan.
                        </p>
                        <p className="text-muted-foreground">
                            Membangun generasi teknologi yang unggul, berkarakter, dan berkontribusi positif bagi perkembangan teknologi informasi di Indonesia melalui berbagai program dan kegiatan yang bermanfaat.
                        </p>
                    </div>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image src="https://placehold.co/600x401" layout="fill" objectFit="cover" alt="Visi Misi Image" data-ai-hint="students planning meeting"/>
                    </div>
                </div>
            </Card>
        </div>
      </section>

    </div>
  );
}
