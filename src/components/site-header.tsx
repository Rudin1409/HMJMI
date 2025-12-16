
"use client";

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNavLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/about', label: 'Tentang' },
  { href: '/profile', label: 'Profil' },
  { href: '/proker', label: 'Program' },
];

const trailingNavLink = { href: '/aspiration', label: 'Aspirasi' };

const beritaSubLinks = [
    { href: '/berita/hmj', label: 'Berita HMJ' },
    { href: '/berita/artikel-dan-pengetahuan', label: 'Artikel & Pengetahuan' },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIsActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };
  
  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = getIsActive(href);
    return (
      <Link
        href={href}
        className={cn(
          'relative font-semibold transition-colors hover:text-primary py-2 text-sm',
          isActive ? 'text-primary' : 'text-foreground/80'
        )}
      >
        {label}
        {isActive && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full"></span>
        )}
      </Link>
    );
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b bg-background/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo/logohmj.png" width={48} height={48} alt="HMJ MI POLSRI Logo" className="h-10 w-10" />
           <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-primary">HMJ MI POLSRI</span>
              <span className="text-xs font-semibold leading-tight text-muted-foreground">Bersatu Beraksi, Bersinar Berprestasi</span>
            </div>
        </Link>
        
        <nav className="hidden items-center space-x-8 text-sm lg:flex">
          {mainNavLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn(
                    'relative font-semibold transition-colors hover:text-primary py-2 text-sm px-0 hover:bg-transparent',
                    getIsActive('/berita') ? 'text-primary' : 'text-foreground/80'
                )}>
                    Berita
                    <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
                     {getIsActive('/berita') && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full"></span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {beritaSubLinks.map(subLink => (
                    <DropdownMenuItem key={subLink.href} asChild>
                        <Link href={subLink.href}>{subLink.label}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink href={trailingNavLink.href} label={trailingNavLink.label} />
        </nav>
        
        <div className="flex items-center gap-2">
           <ThemeToggle />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background p-0">
              <SheetTitle className="sr-only">Menu Seluler</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 border-b p-6">
                   <Image src="/logo/logohmj.png" width={48} height={48} alt="HMJ MI POLSRI Logo" className="h-10 w-10" />
                   <div className="flex flex-col">
                      <span className="text-lg font-bold leading-tight text-primary">HMJ MI POLSRI</span>
                      <span className="text-xs font-semibold leading-tight text-muted-foreground">Bersatu Beraksi, Bersinar Berprestasi</span>
                    </div>
                </div>
                <nav className="mt-6 flex flex-col gap-2 p-6">
                  {[...mainNavLinks, ...beritaSubLinks, trailingNavLink].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-md px-4 py-3 text-lg font-medium transition-colors hover:bg-accent hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
