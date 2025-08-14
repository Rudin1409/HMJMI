
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

export function CtaSection() {
  return (
    <section id="cta" className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto p-8 md:p-12 bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl shadow-lg text-center overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full"></div>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-primary/10 rounded-full"></div>
            <div className='relative z-10'>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Tetap Terhubung dengan <span className="text-primary">HMJMI</span>
                </h2>
                <p className="text-muted-foreground mt-4 mb-8 max-w-2xl mx-auto">
                    Berlangganan buletin kami untuk mendapatkan pembaruan terbaru, acara, dan peluang eksklusif dari kami.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Input 
                        type="email" 
                        placeholder="Masukkan email Anda" 
                        className="bg-white/80 focus:bg-white border-gray-300" 
                    />
                    <Button type="submit" size="lg" className="rounded-full">
                        Berlangganan <Send className="ml-2 h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
      </div>
    </section>
  );
}

    