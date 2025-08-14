import Link from 'next/link';
import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function SiteFooter() {
  const socialLinks = [
    { href: '#', icon: Instagram, label: 'Instagram' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Github, label: 'GitHub' },
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Mail, label: 'Email' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Link href="/" className="flex items-center space-x-3">
              <Logo className="h-12 w-12 text-primary" />
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">HMIF</span>
                <span className="text-sm font-semibold leading-tight text-muted-foreground">UNIVERSITAS SRIWIJAYA</span>
              </div>
            </Link>
          
          <div className="flex space-x-2">
            {socialLinks.map((social) => (
              <Button key={social.label} variant="ghost" size="icon" asChild className="text-muted-foreground hover:bg-primary/20 hover:text-primary">
                <Link href={social.href} aria-label={social.label}>
                  <social.icon className="h-5 w-5" />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HMIF FASILKOM UNSRI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
