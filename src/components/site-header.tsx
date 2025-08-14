"use client";

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#divisi', label: 'Departemen' },
  { href: '#berita', label: 'Berita' },
  { href: '#galeri', label: 'Galeri' },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState('#home');

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      const sections = navLinks.map(link => document.querySelector(link.href));
      sections.forEach(section => {
        if (section && section.offsetTop <= scrollPosition + 100) {
          setActiveLink(`#${section.id}`);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (href: string) => {
    return cn(
      'relative font-semibold transition-colors hover:text-primary',
      activeLink === href ? 'text-primary' : (isScrolled ? 'text-foreground' : 'text-white'),
       'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:scale-x-0 after:transition-transform after:duration-300',
       activeLink === href && 'after:scale-x-100'
    );
  };
  
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b border-border/40 bg-background/80 backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Logo className="h-10 w-10 text-primary" />
          <span className={cn('text-xl font-bold', isScrolled ? 'text-primary' : 'text-white')}>HMIF</span>
        </Link>
        
        <nav className="hidden items-center space-x-8 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={getLinkClass(link.href)}
              onClick={() => setActiveLink(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
           <Button asChild size="sm" className='hidden md:flex'>
              <Link href="#kontak">Hubungi Kami</Link>
           </Button>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className={cn("md:hidden", !isScrolled && "text-white hover:bg-white/10 hover:text-white")} size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] bg-background">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center space-x-2">
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="font-bold">HMIF UNSRI</span>
                  </Link>
                   <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                   </Button>
                </div>
                <nav className="mt-6 flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="mt-auto">
                    <Link href="#kontak" onClick={() => setMobileMenuOpen(false)}>Hubungi Kami</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
