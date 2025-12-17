import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { FaqSection } from '@/components/sections/faq-section';
import { CtaSection } from '@/components/sections/cta-section';
import { ProgramHighlightsSection } from '@/components/sections/program-highlights-section';
import { DivisionsSection } from '@/components/sections/divisions-section';
import { ScrollAnimation } from '@/components/scroll-animation';
import { VisitorTracker } from '@/components/visitor-tracker';

export default function Home() {
  return (
    <div className="flex flex-col">
      <VisitorTracker />
      <HeroSection />
      <ScrollAnimation>
        <AboutSection />
      </ScrollAnimation>
      <ScrollAnimation>
        <ProgramHighlightsSection />
      </ScrollAnimation>
      <ScrollAnimation>
        <DivisionsSection />
      </ScrollAnimation>
      <ScrollAnimation>
        <FaqSection />
      </ScrollAnimation>
      <ScrollAnimation>
        <CtaSection />
      </ScrollAnimation>
    </div>
  );
}
