
'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, MessageSquareQuote, FileText, CheckCircle, ArrowUpRight, Send, LayoutDashboard } from 'lucide-react';
import { ScrollAnimation } from '@/components/scroll-animation';
import { BackgroundBlobs } from '@/components/ui/background-blobs';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { MagneticButton } from '@/components/ui/magnetic-button';

const processSteps = [
  {
    icon: <MessageSquareQuote className="h-6 w-6 text-white" />,
    title: "1. Buka Google Form",
    description: "Klik tombol di samping untuk membuka formulir aspirasi resmi kami."
  },
  {
    icon: <FileText className="h-6 w-6 text-white" />,
    title: "2. Isi & Kirim Aspirasi",
    description: "Tuliskan saran, kritik, atau ide inovatif Anda secara detail."
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-white" />,
    title: "3. Peninjauan Tim",
    description: "Aspirasi Anda akan ditinjau dan ditindaklanjuti oleh tim kami."
  }
];

export default function AspirationPage() {
  return (
    <div className="flex flex-col relative overflow-hidden bg-transparent min-h-screen">
      <BackgroundBlobs />

      {/* 1. Standard Uniform Hero Section - Full Screen */}
      <section id="hero-standard" className="relative w-full min-h-screen pt-20 flex flex-col items-center justify-center text-center">
        <div className="container mx-auto px-6 relative z-10 w-full">
          <ScrollAnimation direction="down">
            <div className="inline-flex items-center justify-center p-[1px] mb-8 rounded-full bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-blue-500/40">
              <div className="bg-background/80 backdrop-blur-md rounded-full px-5 py-2">
                <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                  Pusat Aspirasi Mahasiswa
                </span>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={1}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-8 tracking-tight leading-tight">
              Suara Anda, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                Energi Perubahan Kami
              </span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation delay={2}>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
              Wadah resmi untuk menyalurkan ide, saran, dan kritik membangun demi kemajuan HMJ MI POLSRI yang lebih gemilang.
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={3} className="flex justify-center">
            <Link href="#content-section">
              <MagneticButton className="shadow-2xl shadow-pink-500/20">
                <span className="flex items-center gap-2">
                  Pelajari Alurnya <ChevronDown className="h-5 w-5" />
                </span>
              </MagneticButton>
            </Link>
          </ScrollAnimation>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Link href="#content-section" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            <ChevronDown className="h-10 w-10 opacity-70" />
          </Link>
        </div>
      </section>

      {/* 2. Content Section (The Screenshot Layout) - "Dijadikan satu section di bawah hero" */}
      <section id="content-section" className="relative w-full py-24 bg-white/5 border-t border-white/5 min-h-screen flex items-center">
        <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Column: Title + Call to Action Card */}
            <ScrollAnimation direction="left" className="flex flex-col space-y-8">
              <div>
                <Badge variant="outline" className="mb-4 border-pink-500/50 text-pink-500 bg-pink-500/10 px-4 py-1.5 text-sm font-semibold rounded-full">
                  Saluran Resmi
                </Badge>

                <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight leading-tight">
                  Sampaikan <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                    Gagasan Anda
                  </span>
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Kami menggunakan Google Form untuk mengumpulkan semua masukan. Klik tombol di bawah ini untuk menyampaikan aspirasi Anda.
                </p>
              </div>

              {/* The "Quote Card" */}
              <SpotlightCard className="w-full bg-black/40 border-white/10 p-8 md:p-10 relative overflow-hidden group rounded-3xl" spotlightColor="rgba(236, 72, 153, 0.15)">
                {/* Decorative background icon */}
                <MessageSquareQuote className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-500" />

                <div className="relative z-10 flex flex-col items-start gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center border border-white/5 shadow-inner">
                    <LayoutDashboard className="w-8 h-8 text-pink-500" />
                  </div>

                  <div className="space-y-4">
                    <p className="text-2xl font-bold italic text-white/90 leading-tight">
                      "Dari Kami, Oleh Kami, Untuk MI"
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Setiap aspirasi adalah langkah nyata menuju perubahan.
                    </p>
                  </div>

                  <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 rounded-xl text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-lg shadow-pink-500/25 border-0 hover:scale-[1.02] transition-all duration-300">
                    <Link href="https://bit.ly/AKSMIPOLSRI2026" target="_blank" rel="noopener noreferrer">
                      Isi Formulir Aspirasi <ArrowUpRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </SpotlightCard>
            </ScrollAnimation>

            {/* Right Column: Process Steps */}
            <ScrollAnimation direction="right" className="flex flex-col space-y-8 lg:pl-8 border-l border-white/5 lg:py-4">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-foreground">
                  Bagaimana Aspirasi Anda Diproses?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kami percaya pada transparansi. Berikut adalah tahapan yang akan dilalui oleh setiap aspirasi yang kami terima.
                </p>
              </div>

              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <ScrollAnimation key={index} delay={index * 1.5} direction="left">
                    <SpotlightCard className="p-6 bg-black/20 border-white/5 hover:border-pink-500/30 transition-all duration-300 group rounded-2xl" spotlightColor="rgba(139, 92, 246, 0.08)">
                      <div className="flex items-start gap-5">
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 transition-all duration-300 shadow-sm border border-white/5">
                          {step.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-1 text-white group-hover:text-pink-400 transition-colors">{step.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </ScrollAnimation>
                ))}
              </div>
            </ScrollAnimation>

          </div>

        </div>
      </section>
    </div>
  );
}
