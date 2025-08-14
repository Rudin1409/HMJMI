import Link from 'next/link';
import { Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function SiteFooter() {
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#tentang', label: 'Tentang' },
    { href: '#divisi', label: 'Divisi' },
    { href: '#berita', label: 'Berita' },
    { href: '#galeri', label: 'Galeri' },
    { href: '#kontak', label: 'Kontak' },
  ];

  const socialLinks = [
    { href: '#', icon: Instagram, label: 'Instagram' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Github, label: 'GitHub' },
    { href: '#', icon: Twitter, label: 'Twitter' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-10 w-10 text-accent" />
              <span className="text-xl font-bold">HMJMI Polsri</span>
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Himpunan Mahasiswa Jurusan Manajemen Informatika Politeknik Negeri Sriwijaya.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-primary-foreground/80 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Hubungi Kami</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-sm text-primary-foreground/80">
                  Jl. Srijaya Negara, Bukit Lama, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan 30139
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-sm text-primary-foreground/80">contact@hmjmi.polsri.ac.id</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-sm text-primary-foreground/80">+62 123 4567 890</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Media Sosial</h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((social) => (
                <Button key={social.label} variant="ghost" size="icon" asChild className="text-primary-foreground/80 hover:bg-white/10 hover:text-white">
                  <Link href={social.href} aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} HMJMI Politeknik Negeri Sriwijaya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
