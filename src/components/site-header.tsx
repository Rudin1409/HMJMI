"use client";

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#profile', label: 'Profile' },
  { href: '#proker', label: 'Proker' },
  { href: '#academic', label: 'Academic' },
  { href: '#aspiration', label: 'Aspiration' },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState('#home');
  // Simple dark mode toggle for visual effect, no actual theme change logic
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      const sections = navLinks.map(link => document.querySelector(link.href));
      let currentSection = '';
      sections.forEach(section => {
        if (section && section.offsetTop <= scrollPosition + 150) {
          currentSection = `#${section.id}`;
        }
      });
      if (currentSection) {
        setActiveLink(currentSection);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (href: string) => {
    return cn(
      'font-semibold transition-colors hover:text-primary py-2 px-3 rounded-md',
      activeLink === href ? 'bg-pink-100 text-primary' : 'text-gray-600',
    );
  };
  
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b bg-white/80 backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Logo className="h-10 w-10" />
          <div className="flex flex-col">
            <span className={cn('text-lg font-bold text-gray-800')}>HMIF UNSRI</span>
            <span className="text-xs text-muted-foreground">Keilmuan, Profesional, Inovasi</span>
          </div>
        </Link>
        
        <nav className="hidden items-center space-x-2 text-sm lg:flex">
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
           <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="hidden lg:flex">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
           </Button>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] bg-background">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center space-x-2">
                    <Logo className="h-8 w-8" />
                    <span className="font-bold">HMIF UNSRI</span>
                  </Link>
                   <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                   </Button>
                </div>
                <nav className="mt-6 flex flex-col space-y-2">
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
                 <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="mt-auto">
                    {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                    <span className="sr-only">Toggle theme</span>
               </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
