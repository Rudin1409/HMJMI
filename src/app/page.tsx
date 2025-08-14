import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { DivisionsSection } from '@/components/sections/divisions-section';
import { NewsEventsSection } from '@/components/sections/news-events-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <DivisionsSection />
      <NewsEventsSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
}
