import Link from 'next/link';
import { Github, Instagram, Linkedin, Mail, Twitter, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SiteFooter() {
  const socialLinks = [
    { href: '#', icon: Instagram, label: 'Instagram' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Github, label: 'GitHub' },
    { href: '#', icon: Twitter, label: 'Twitter' },
  ];

  const menuLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Us' },
    { href: '#profile', label: 'Profile' },
    { href: '#proker', label: 'Proker' },
    { href: '#academic', label: 'Academic' },
    { href: '#aspiration', label: 'Aspiration' },
  ];

  const infoLinks = [
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#faq', label: 'FAQ' },
  ];


  return (
    <footer className="bg-pink-50/50 text-gray-800">
      <div className="container py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Logo className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">HMIF UNSRI</span>
                <span className="text-sm font-semibold leading-tight text-muted-foreground">Kuatkan Formasi Wujudkan Inovasi</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Himpunan Mahasiswa Informatika Fakultas Ilmu Komputer Universitas Sriwijaya - Wadah kreativitas dan inovasi mahasiswa informatika.
            </p>
             <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Jl. Srijaya Negara, Bukit Besar, Palembang, Sumatera Selatan 30139</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">hmif@unsri.ac.id</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+62 812-3456-7890</span>
              </div>
            </div>
          </div>
          
          {/* Column 2: Menu */}
          <div className="md:col-start-2 lg:col-start-3">
            <h4 className="font-bold text-lg mb-4">Menu</h4>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                     <span className="text-primary">•</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Informasi */}
          <div>
            <h4 className="font-bold text-lg mb-4">Informasi</h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <span className="text-primary">•</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-pink-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; 2025 HMIF UNSRI. Made with ❤️ by HMIF Dev Team</p>
          <div className="flex space-x-2 mt-4 sm:mt-0">
             {socialLinks.map((social) => (
              <Button key={social.label} variant="ghost" size="icon" asChild className="text-muted-foreground hover:bg-primary/10 hover:text-primary">
                <Link href={social.href} aria-label={social.label}>
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
