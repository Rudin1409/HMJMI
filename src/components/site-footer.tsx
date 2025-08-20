import Link from 'next/link';
import { Github, Instagram, Linkedin, Mail, Twitter, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function SiteFooter() {
  const socialLinks = [
    { href: 'https://www.instagram.com/hmjmi.polsri/', icon: Instagram, label: 'Instagram' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Github, label: 'GitHub' },
    { href: '#', icon: Mail, label: 'Email' },
  ];

  const menuLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/about', label: 'Tentang Kami' },
    { href: '/profile', label: 'Profil' },
    { href: '/proker', label: 'Program Kerja' },
    { href: '/aspiration', label: 'Aspirasi' },
  ];

  const infoLinks = [
    { href: '#testimonials', label: 'Testimoni' },
    { href: '#faq', label: 'FAQ' },
  ];


  return (
    <footer className="bg-transparent text-foreground border-t">
      <div className="container py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Logo className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-primary">HMJMI POLSRI</span>
                <span className="text-sm font-semibold leading-tight text-muted-foreground">Manajemen Informatika</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Wadah kreativitas, inovasi, dan pengembangan potensi mahasiswa informatika Politeknik Negeri Sriwijaya.
            </p>
             <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Jl. Srijaya Negara, Bukit Besar, Palembang, Sumatera Selatan 30139</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="mailto:hmjmi@polsri.ac.id" className="text-muted-foreground hover:text-primary transition-colors">hmjmi@polsri.ac.id</a>
              </div>
            </div>
          </div>
          
          {/* Column 2: Menu */}
          <div className="md:col-start-2 lg:col-start-3">
            <h4 className="font-bold text-lg mb-4 text-primary">Menu</h4>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                     <span className="text-accent">•</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Informasi */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-primary">Informasi</h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <span className="text-accent">•</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HMJMI POLSRI. Seluruh hak cipta dilindungi.</p>
          <div className="flex space-x-1 mt-4 sm:mt-0">
             {socialLinks.map((social) => (
              <Button key={social.label} variant="ghost" size="icon" asChild className="text-muted-foreground hover:bg-primary/10 hover:text-primary">
                <Link href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-5 w-5" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
