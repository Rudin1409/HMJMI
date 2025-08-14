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
  { href: '#divisi', label: 'Divisi' },
  { href: '#berita', label: 'Berita' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#kontak', label: 'Kontak' },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b border-border/40 bg-background/80 backdrop-blur-lg' : 'bg-transparent text-white'
      )}
    >
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className={cn('h-10 w-10', isScrolled ? 'text-primary' : 'text-accent')} />
          <span className={cn('text-xl font-bold', isScrolled ? 'text-primary' : 'text-white')}>HMJMI Polsri</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden items-center space-x-8 text-sm font-semibold md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn('transition-colors', isScrolled ? 'text-foreground hover:text-primary' : 'hover:text-accent')}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button asChild size="sm" variant={isScrolled ? "default" : "outline"} className={cn(!isScrolled && 'border-accent text-accent hover:bg-accent hover:text-accent-foreground')}>
                <Link href="#kontak">Hubungi Kami</Link>
            </Button>
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] bg-background">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center space-x-2">
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="font-bold">HMJMI Polsri</span>
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
