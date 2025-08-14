import { HeroSection } from '@/components/sections/hero-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { FaqSection } from '@/components/sections/faq-section';
import { InstagramSection } from '@/components/sections/instagram-section';
import { CtaSection } from '@/components/sections/cta-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TestimonialsSection />
      <FaqSection />
      <InstagramSection />
      <CtaSection />
    </div>
  );
}
