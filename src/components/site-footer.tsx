import Link from "next/link";
import {
    Github,
    Instagram,
    Linkedin,
    Mail,
    Twitter,
    MapPin,
    Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SiteFooter() {
    const socialLinks = [
        {
            href: "https://www.instagram.com/hmjmi_polsri/",
            icon: Instagram,
            label: "Instagram",
        },
        { href: "https://wa.me/6287788060935", icon: Phone, label: "WhatsApp" },
        { href: "mailto:hmjmi@polsri.ac.id", icon: Mail, label: "Email" },
    ];

    const menuLinks = [
        { href: "/", label: "Beranda" },
        { href: "/about", label: "Tentang Kami" },
        { href: "/profile", label: "Profil" },
        { href: "/proker", label: "Program Kerja" },
        { href: "/berita", label: "Berita" },
        { href: "/aspiration", label: "Aspirasi" },
    ];

    const infoLinks = [
        { href: "#faq", label: "FAQ" },
    ];

    return (
        <footer className="relative mt-20">
            {/* Gradient Top Border Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="bg-background/90 border-t border-white/20 rounded-t-[2.5rem] pt-16 pb-8">
                <div className="container px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {/* Column 1: Logo and About */}
                        <div className="space-y-6">
                            <Link href="/" className="flex items-center space-x-3 group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <Image
                                        src="/logo/logohmj.png"
                                        width={56}
                                        height={56}
                                        alt="HMJ MI POLSRI Logo"
                                        className="h-12 w-12 relative z-10"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-extrabold leading-tight text-foreground tracking-tight">
                                        HMJ MI <span className="text-primary">POLSRI</span>
                                    </span>
                                    <span className="text-xs font-medium leading-tight text-muted-foreground tracking-widest uppercase">
                                        Est. 2002
                                    </span>
                                </div>
                            </Link>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                                Wadah kreativitas, inovasi, dan pengembangan potensi
                                mahasiswa informatika Politeknik Negeri Sriwijaya menuju era digital.
                            </p>
                            <div className="space-y-4 pt-2">
                                <div className="flex items-start gap-3 text-sm group">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <span className="text-muted-foreground mt-1">
                                        Jl. Sungai Sahang Ujung, Lorok Pakjo, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm group">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <a
                                        href="mailto:hmjmi@polsri.ac.id"
                                        className="text-muted-foreground hover:text-primary transition-colors font-medium"
                                    >
                                        hmjmi@polsri.ac.id
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Menu */}
                        <div className="md:col-start-2 lg:col-start-3">
                            <h4 className="font-bold text-lg mb-6 text-foreground flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary rounded-full"></span>
                                Menu Utama
                            </h4>
                            <ul className="space-y-3">
                                {menuLinks.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Informasi */}
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-foreground flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary rounded-full"></span>
                                Tautan Lain
                            </h4>
                            <ul className="space-y-3">
                                {infoLinks.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <h5 className="text-sm font-semibold mb-3 text-muted-foreground">Ikuti Kami</h5>
                                <div className="flex space-x-2">
                                    {socialLinks.map((social) => (
                                        <Button
                                            key={social.label}
                                            variant="outline"
                                            size="icon"
                                            asChild
                                            className="rounded-full bg-transparent border-primary/20 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 w-10 h-10"
                                        >
                                            <Link
                                                href={social.href}
                                                aria-label={social.label}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <social.icon className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-muted-foreground">
                                &copy; {new Date().getFullYear()} <span className="font-semibold text-foreground">HMJ MI POLSRI</span>. All rights reserved.
                            </p>
                            <p className="text-xs text-muted-foreground/50 mt-1">
                                Powered by <span className="font-semibold text-primary">PTKP</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            <Image
                                src="/logo/logopolsri.png"
                                width={40}
                                height={40}
                                alt="Logo Polsri"
                                className="h-8 w-auto hover:scale-110 transition-transform"
                            />
                            <Image
                                src="/logo/logohmj.png"
                                width={40}
                                height={40}
                                alt="Logo HMJ MI"
                                className="h-8 w-auto hover:scale-110 transition-transform"
                            />
                            <Image
                                src="/logo/logokabinet.png"
                                width={40}
                                height={40}
                                alt="Logo Kabinet"
                                className="h-10 w-auto hover:scale-110 transition-transform"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
