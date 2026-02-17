import { Card, CardContent } from '@/components/ui/card';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, Code, Users, Target, Rocket } from 'lucide-react';
import { ScrollAnimation } from '@/components/scroll-animation';

const stats = [
  {
    icon: <Calendar className="h-6 w-6 text-white" />,
    title: 'Didirikan Sejak 2002',
    description: 'Lebih dari 20 tahun mencetak talenta digital.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: '5 Departemen',
    description: 'Kolaborasi lintas bidang untuk hasil optimal.',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: <Code className="h-6 w-6 text-white" />,
    title: '11 Divisi Khusus',
    description: 'Fokus pada pengembangan keahlian spesifik.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Briefcase className="h-6 w-6 text-white" />,
    title: '15+ Program Kerja',
    description: 'Inisiatif beragam untuk pemberdayaan mahasiswa.',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="w-full py-20 md:py-32 relative overflow-hidden bg-primary/40">
      {/* Background Glows (Static for performance) */}
      <div className="absolute top-0 right-0 -translate-y-1/2 w-96 h-96 bg-white/20 blur-[50px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <ScrollAnimation>
            <Badge variant="outline" className="border-primary/50 text-slate-900 dark:text-white mb-6 py-1.5 px-4 font-semibold text-sm bg-white/40 dark:bg-white/15">
              Jejak Langkah Kami
            </Badge>
          </ScrollAnimation>

          <ScrollAnimation delay={1}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
              Merangkai Inovasi, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600">
                Mencetak Talenta
              </span>
            </h2>
          </ScrollAnimation>

          <ScrollAnimation delay={2}>
            <p className="text-slate-700 dark:text-slate-200 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              Himpunan Mahasiswa Jurusan Manajemen Informatika adalah organisasi kemahasiswaan yang menjadi wadah bagi mahasiswa untuk berinovasi, berkreasi, dan mengembangkan potensi di bidang teknologi informasi.
            </p>
          </ScrollAnimation>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <ScrollAnimation key={index} delay={index + 1} className="h-full">
              <div className="group relative h-full">
                <div className="absolute inset-0 bg-white/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <SpotlightCard className="relative overflow-hidden border-white/40 bg-white/40 hover:bg-white/55 transition-all duration-300 hover:-translate-y-2 h-full shadow-sm hover:shadow-xl">
                  <CardContent className="flex flex-col items-center gap-5 p-6 md:p-8 text-center h-full">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6 text-white`}>
                      {stat.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900">{stat.title}</h3>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">{stat.description}</p>
                    </div>
                  </CardContent>
                  <div className="absolute inset-0 rounded-xl border border-white/60 group-hover:border-white/80 transition-colors duration-300 pointer-events-none" />
                </SpotlightCard>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Quote Section */}
        <div className="text-center mb-16">
          <ScrollAnimation delay={1}>
            <p className="text-2xl md:text-3xl font-bold text-slate-900/90 italic drop-shadow-sm">
              "Bersatu Beraksi, Bersinar Berprestasi"
            </p>
          </ScrollAnimation>
        </div>

        {/* Visi Misi Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Visi Card */}
          <ScrollAnimation delay={2} className="h-full">
            <div className="group relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <Card className="relative h-full p-8 md:p-10 bg-white/40 border-white/40 rounded-[1.9rem] flex flex-col items-start gap-6 hover:bg-white/50 transition-colors shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 mb-2 text-white">
                  <Target className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Visi Kami</h3>
                  <p className="text-slate-800 leading-loose text-base md:text-lg font-medium">
                    Mewujudkan Himpunan Mahasiswa Jurusan Manajemen Informatika yang mengedepankan rasa tanggung jawab, harmoni, kebersamaan, serta menciptakan lingkungan yang inspiratif dan kolaboratif.
                  </p>
                </div>
              </Card>
            </div>
          </ScrollAnimation>

          {/* Misi Card */}
          <ScrollAnimation delay={4} className="h-full">
            <div className="group relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <Card className="relative h-full p-8 md:p-10 bg-white/40 border-white/40 rounded-[1.9rem] flex flex-col items-start gap-6 hover:bg-white/50 transition-colors shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-2 text-white">
                  <Rocket className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Misi Kami</h3>
                  <p className="text-slate-800 leading-loose text-base md:text-lg font-medium">
                    Meningkatkan kepedulian sosial, mendorong pengembangan kompetensi, menjadi pusat informasi kreatif, serta menumbuhkan jiwa kewirausahaan dan bakat mahasiswa.
                  </p>
                </div>
              </Card>
            </div>
          </ScrollAnimation>
        </div>

      </div>
    </section>
  );
}
