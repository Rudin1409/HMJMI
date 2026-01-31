
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, MessageSquareQuote, FileText, CheckCircle, ArrowUpRight } from 'lucide-react';
import { ScrollAnimation } from '@/components/scroll-animation';

const processSteps = [
  {
    icon: <MessageSquareQuote className="h-8 w-8 text-primary" />,
    title: "1. Buka Google Form",
    description: "Klik tombol di bawah untuk membuka formulir aspirasi kami di halaman baru."
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "2. Isi & Kirim Aspirasi",
    description: "Sampaikan saran, kritik, atau ide Anda melalui kolom yang tersedia di Google Form."
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "3. Peninjauan Tim",
    description: "Setiap aspirasi yang masuk akan ditinjau oleh tim kami untuk ditindaklanjuti."
  }
];

export default function AspirationPage() {

  return (
    <div className="flex flex-col">
      <section
        id="hero-aspiration"
        className="relative w-full flex items-center justify-center min-h-screen bg-transparent overflow-hidden"
      >
        <ScrollAnimation className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-6 border-primary/50 text-white bg-primary/10 backdrop-blur-md px-6 py-2 text-base font-semibold rounded-full shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 transition-transform">
            Kami Mendengar Anda
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 tracking-tight">
            Suara Anda, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-600 animate-gradient-x">Perubahan Kita</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            Setiap suara, saran, dan ide Anda adalah aset berharga yang membantu kami untuk terus berkembang. Mari berkontribusi untuk kemajuan bersama.
          </p>
          <div className="mt-12">
            <a href="#aspiration-form">
              <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-primary/20 bg-background/50 text-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary backdrop-blur-sm animate-bounce shadow-lg transition-all duration-300">
                <ChevronDown className="h-6 w-6" />
              </Button>
            </a>
          </div>
        </ScrollAnimation>
      </section>

      <ScrollAnimation>
        <section id="aspiration-form" className="w-full py-16 md:py-24 bg-primary/35 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
              <div className='flex flex-col items-center text-center'>
                <div className="text-center mb-8">
                  <Badge variant="outline" className="mb-4 border-primary/50 text-foreground bg-primary/10">Saluran Resmi</Badge>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
                    Sampaikan <span className="text-primary">Gagasan Anda</span>
                  </h2>
                  <p className="mt-4 max-w-xl text-muted-foreground text-lg">
                    Kami menggunakan Google Form untuk mengumpulkan semua masukan. Klik tombol di bawah ini untuk menyampaikan aspirasi Anda.
                  </p>
                </div>
                <Card className='w-full max-w-md bg-background/95 backdrop-blur-xl border-white/20 shadow-[0_0_50px_-10px_hsl(var(--primary)/0.2)] relative overflow-hidden group'>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <CardContent className="p-10 flex flex-col items-center justify-center relative z-10">
                    <div className="mb-8 p-4 bg-primary/10 rounded-full animate-pulse">
                      <MessageSquareQuote className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-foreground font-medium mb-8 text-center text-xl italic">
                      "Dari Kami, Oleh Kami, Untuk MI"
                    </p>
                    <Button asChild size="lg" className="w-full rounded-full h-12 text-base shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all duration-300">
                      <Link href="https://bit.ly/ASKMIPOLSRI2025" target="_blank" rel="noopener noreferrer">
                        Isi Formulir Aspirasi <ArrowUpRight className="ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <div className="text-left mb-4">
                  <h3 className="text-2xl font-bold text-foreground">Bagaimana Aspirasi Anda Diproses?</h3>
                  <p className="text-muted-foreground mt-2">Kami percaya pada transparansi. Berikut adalah tahapan yang akan dilalui oleh setiap aspirasi yang kami terima.</p>
                </div>
                {processSteps.map((step, index) => (
                  <Card key={index} className="border-l-4 border-l-primary border-y-white/5 border-r-white/5 bg-background/90 backdrop-blur-sm shadow-none hover:bg-background/100 transition-colors duration-300">
                    <CardContent className="flex items-start gap-6 p-6">
                      <div className="flex-shrink-0 bg-primary/10 text-primary rounded-xl p-3 mt-1">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-foreground mb-1">{step.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}
