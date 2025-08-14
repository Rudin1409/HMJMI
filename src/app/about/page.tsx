
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Briefcase, Calendar, Code, Users, ChevronDown, Rocket, Target, Leaf, Feather, PawPrint } from 'lucide-react';

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

const logoPhilosophy = [
    {
        icon: <Leaf className="w-5 h-5 text-primary" />,
        title: "7 Kelopak Bunga",
        description: "Melambangkan 7 dinas dalam HMIF."
    },
    {
        icon: <Feather className="w-5 h-5 text-primary" />,
        title: "3 Bulu Sayap",
        description: "Melambangkan tridharma perguruan tinggi yakni pendidikan, penelitian, serta pengabdian kepada masyarakat."
    },
    {
        icon: <PawPrint className="w-5 h-5 text-primary" />,
        title: "5 Bulu Ekor",
        description: "Melambangkan lima fungsi mahasiswa sebagai Agent of Change, Iron Stock, Moral Force, Social Control, serta Guardian of Value."
    }
]

const galleryItems = [
    {
        src: "https://placehold.co/400x300",
        title: "RAKER X UPGRADING HMIF UNSRI",
        year: "2025",
        hint: "student presentation"
    },
    {
        src: "https://placehold.co/400x301",
        title: "RAKER X UPGRADING HMIF UNSRI",
        year: "2025",
        hint: "student audience"
    },
    {
        src: "https://placehold.co/400x302",
        title: "RAKER X UPGRADING HMIF UNSRI",
        year: "2025",
        hint: "group photo"
    },
    {
        src: "https://placehold.co/400x303",
        title: "RAKER X UPGRADING HMIF UNSRI",
        year: "2025",
        hint: "students sitting"
    },
    {
        src: "https://placehold.co/400x304",
        title: "MAKRAB X BUKBER X IPK HMIF UNSRI",
        year: "2025",
        hint: "large group"
    },
    {
        src: "https://placehold.co/400x305",
        title: "MAKRAB X BUKBER X IPK HMIF UNSRI",
        year: "2025",
        hint: "students listening"
    },
    {
        src: "https://placehold.co/400x306",
        title: "MAKRAB X BUKBER X IPK HMIF UNSRI",
        year: "2025",
        hint: "student team"
    },
    {
        src: "https://placehold.co/400x307",
        title: "MAKRAB X BUKBER X IPK HMIF UNSRI",
        year: "2025",
        hint: "student speaking"
    },
]


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
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-1 bg-primary rounded-full"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Vision & <span className="text-primary">Mission</span>
                </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="p-8 shadow-lg rounded-2xl bg-white relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-50 rounded-full"></div>
                    <div className="relative z-10">
                        <div className="bg-pink-100 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <Target className="w-8 h-8"/>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Vision</h3>
                        <p className="text-muted-foreground">Membangun generasi teknologi yang unggul, berkarakter, dan berkontribusi positif bagi perkembangan teknologi informasi di Indonesia melalui berbagai program dan kegiatan yang bermanfaat.</p>
                    </div>
                </Card>
                <Card className="p-8 shadow-lg rounded-2xl bg-white relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-50 rounded-full"></div>
                     <div className="relative z-10">
                        <div className="bg-pink-100 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <Rocket className="w-8 h-8"/>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Mission</h3>
                        <p className="text-muted-foreground">Menjadi wadah pengembangan potensi mahasiswa Teknik Informatika yang berkualitas, inovatif, dan berdaya saing global melalui kegiatan akademik dan non-akademik yang berstruktur dan berkelanjutan.</p>
                    </div>
                </Card>
            </div>
             <p className="text-center italic text-muted-foreground mt-8 text-lg">"Satukan Ambisi, Wujudkan Mimpi"</p>
        </div>
      </section>
      
       <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-1 bg-primary rounded-full"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Filosofi Logo <span className="text-primary">Arthasena</span>
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <div className="relative aspect-square">
                        <Image src="https://placehold.co/500x500" layout="fill" objectFit="contain" alt="Filosofi Logo" data-ai-hint="abstract logo phoenix flower" />
                    </div>
                    <div>
                        <Card className="p-8 shadow-lg rounded-2xl bg-white">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Filosofi Logo</h3>
                            <p className="text-muted-foreground mb-6">
                                Logo kabinet Arthasena menggambarkan ketangguhan, kebijaksaan, dan semangat inovasi. Bunga teratai menggambarkan kemurnian dan perjuangan untuk terus berkembang meski menghadapi tantangan, serta burung dengan sayap merepresentasikan keberanian, kebebasan berpikir, dan tekad untuk membawa himpunan lebih tinggi. Kombinasi ini mencerminkan kepemimpinan yang kuat, inovatif, dan berintegritas.
                            </p>
                            <div className="space-y-4">
                               {logoPhilosophy.map((item, index) => (
                                     <div key={index} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{item.title}</h4>
                                            <p className="text-muted-foreground text-sm">{item.description}</p>
                                        </div>
                                    </div>
                               ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
      </section>

      <section id="gallery" className="bg-pink-50/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-1 bg-primary rounded-full"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Our <span className="text-primary">Gallery</span>
                </h2>
                <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
                    Dokumentasi kegiatan dan momen berharga HMIF Universitas Sriwijaya yang menggambarkan perjalanan kami dalam mengembangkan potensi mahasiswa informatika.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {galleryItems.map((item, index) => (
                    <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl bg-white">
                        <CardContent className="p-0">
                            <div className="relative aspect-w-4 aspect-h-3">
                                <Image src={item.src} alt={item.title} layout="fill" objectFit="cover" data-ai-hint={item.hint} />
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 text-center flex-col items-center justify-center">
                            <p className="font-semibold text-primary text-sm">{item.title}</p>
                            <p className="text-xs text-primary/80">{item.year}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      </section>

    </div>
  );
}

    