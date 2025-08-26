import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { FaqSection } from '@/components/sections/faq-section';
import { CtaSection } from '@/components/sections/cta-section';
import { ProgramHighlightsSection } from '@/components/sections/program-highlights-section';
import { DivisionsSection } from '@/components/sections/divisions-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <ProgramHighlightsSection />
      <DivisionsSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
