
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, MessageSquareQuote, FileText, CheckCircle, ArrowUpRight } from 'lucide-react';

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
        className="relative w-full flex items-center justify-center min-h-screen bg-transparent"
      >
        <div className="absolute inset-0 bg-[url('/dot-grid.svg')] bg-repeat bg-center opacity-40"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="default" className="mb-4 bg-primary/10 text-primary">
            Kami Mendengar Anda
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Suara Anda, <span className="text-primary">Perubahan Kita</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Setiap suara, saran, dan ide Anda adalah aset berharga yang membantu kami untuk terus berkembang. Mari berkontribusi untuk kemajuan bersama.
          </p>
          <div className="mt-8">
            <a href="#aspiration-form">
                <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 animate-bounce">
                <ChevronDown className="h-6 w-6" />
                </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="aspiration-form" className="w-full py-16 md:py-24 bg-primary/35 backdrop-blur-sm">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
                <div className='flex flex-col items-center text-center'>
                     <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-1 bg-primary rounded-full"></div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            Sampaikan <span className="text-primary">Gagasan Anda</span>
                        </h2>
                        <p className="mt-4 max-w-xl text-muted-foreground">
                            Kami menggunakan Google Form untuk mengumpulkan semua masukan. Klik tombol di bawah ini untuk menyampaikan aspirasi Anda. Kami sangat menghargai setiap kontribusi dari Anda.
                        </p>
                    </div>
                     <Card className='w-full max-w-md'>
                        <CardContent className="p-8 flex flex-col items-center justify-center">
                            <p className="text-muted-foreground mb-6 text-center">
                                Formulir akan terbuka di tab baru.
                            </p>
                            <Button asChild size="lg" className="w-full">
                                <Link href="https://bit.ly/ASKMIPOLSRI2025" target="_blank" rel="noopener noreferrer">
                                    Isi Formulir Aspirasi <ArrowUpRight className="ml-2" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                 <div className="space-y-8">
                    <div className="text-left">
                        <h3 className="text-2xl font-bold text-foreground">Bagaimana Aspirasi Anda Diproses?</h3>
                        <p className="text-muted-foreground mt-2">Kami percaya pada transparansi. Berikut adalah tahapan yang akan dilalui oleh setiap aspirasi yang kami terima.</p>
                    </div>
                    {processSteps.map((step, index) => (
                        <Card key={index} className="border-l-4 border-primary shadow-sm">
                            <CardContent className="flex items-center gap-6 p-6">
                                <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full p-3">
                                    {step.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-foreground">{step.title}</h4>
                                    <p className="text-muted-foreground text-sm">{step.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

    