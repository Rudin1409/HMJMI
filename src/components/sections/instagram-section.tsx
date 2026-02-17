import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Instagram, Heart, MessageCircle } from 'lucide-react';
import { ScrollAnimation } from '../scroll-animation';

export function InstagramSection() {
  return (
    <section id="instagram" className="w-full py-20 md:py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* Main Glass Card */}
        <div className="relative rounded-[2.5rem] border border-white/20 bg-white/20 dark:bg-black/50 overflow-hidden p-8 md:p-16">

          {/* Background Gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/30 to-purple-600/30 blur-[30px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/20 blur-[30px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

            {/* Content Side */}
            <div className="space-y-8 text-center lg:text-left">
              <ScrollAnimation>
                <Badge variant="outline" className="border-pink-500/50 text-pink-600 dark:text-pink-300 bg-pink-500/10 px-4 py-1.5 text-sm font-semibold rounded-full">
                  <Instagram className="w-3.5 h-3.5 mr-2" />
                  @hmjmi_polsri
                </Badge>
              </ScrollAnimation>

              <ScrollAnimation delay={1}>
                <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
                  Ikuti Jejak Digital <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                    Inovator Muda
                  </span>
                </h2>
              </ScrollAnimation>

              <ScrollAnimation delay={2}>
                <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Jangan lewatkan momen seru, info acara, dan update terbaru seputar teknologi langsung dari feed kami. Jadilah bagian dari komunitas digital HMJMI!
                </p>
              </ScrollAnimation>

              <ScrollAnimation delay={3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-xl shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105">
                    <Link href="https://www.instagram.com/hmjmi_polsri/" target="_blank">
                      Kunjungi Instagram <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-white/20 hover:bg-white/10 dark:text-white">
                    <Link href="/proker">Lihat Galeri</Link>
                  </Button>
                </div>
              </ScrollAnimation>

              {/* Stats / Social Proof */}
              <ScrollAnimation delay={4}>
                <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
                  <div className="text-center lg:text-left">
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">1.5k+</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Followers</p>
                  </div>
                  <div className="w-px h-10 bg-slate-500/20" />
                  <div className="text-center lg:text-left">
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">200+</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Posts</p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Visual Side - Phone Mockup */}
            <ScrollAnimation delay={2} className="relative flex justify-center lg:justify-end group perspective-1000">

              {/* Floating Icons */}
              <div className="absolute top-10 left-10 p-3 bg-white dark:bg-black/80 rounded-2xl shadow-xl shadow-pink-500/20 z-20 animate-bounce [animation-duration:3s]">
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
              </div>
              <div className="absolute bottom-20 right-0 p-3 bg-white dark:bg-black/80 rounded-2xl shadow-xl shadow-purple-500/20 z-20 animate-bounce [animation-duration:4s]">
                <MessageCircle className="w-6 h-6 text-purple-500" />
              </div>

              {/* Phone Frame */}
              <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-8 border-slate-900 shadow-2xl shadow-purple-500/30 overflow-hidden transform transition-transform duration-500 group-hover:rotate-y-6 group-hover:scale-105">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-20"></div>

                {/* Screen Content */}
                <div className="relative w-full h-full bg-white dark:bg-black">
                  <Image
                    src="/Galeri/IT-fest.jpg" // Using an existing image as placeholder for the feed
                    fill
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                    alt="Instagram Feed Preview"
                  />

                  {/* Instagram UI Overlay Mockup */}
                  <div className="absolute top-0 left-0 w-full p-4 pt-8 bg-gradient-to-b from-black/60 to-transparent z-10 flex justify-between items-center text-white">
                    <div className="text-xs font-semibold">@hmjmi_polsri</div>
                    <div className="text-xs">...</div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent z-10 flex justify-between items-center text-white">
                    <div className="flex gap-4">
                      <Heart className="w-5 h-5" />
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div className="text-xs">Lihat Profil</div>
                  </div>
                </div>
              </div>

              {/* Glow Behind Phone */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-600 blur-[30px] opacity-40 -z-10 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500" />
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
