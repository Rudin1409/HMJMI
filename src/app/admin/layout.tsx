'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Newspaper, Menu, X, LogOut, User as UserIcon, Users, MessageCircle, Settings, BarChart, Image as ImageIcon, Shield, Briefcase, PenSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth, useUserProfile } from '@/firebase';
import { api } from '@/lib/api-client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProtectedRoute } from '@/components/auth/protected-route';


const adminNavItems = [
    { href: '/admin/users', label: 'Pengguna', icon: Users, role: 'admin' },
];

const generalItems = [
    { href: '/admin', label: 'Dasbor', icon: Home },
    { href: '/admin/analytics', label: 'Analitik', icon: BarChart },
];

const contentItems = [
    { href: '/admin/berita', label: 'Berita', icon: Newspaper },
    { href: '/admin/comments', label: 'Komentar', icon: MessageCircle },
    { href: '/admin/gallery', label: 'Galeri Foto', icon: ImageIcon },
];

const layoutItems = [
    { href: '/admin/kabinet', label: 'Kabinet', icon: Shield },
    { href: '/admin/struktural', label: 'Struktur Organisasi', icon: Users },
    { href: '/admin/proker', label: 'Program Kerja', icon: Briefcase },
];

function SidebarNav() {
    const pathname = usePathname();
    const { userProfile } = useUserProfile();
    const role = userProfile?.role || 'user';

    const renderNavGroup = (title: string, items: typeof generalItems) => (
        <div className="space-y-1.5 px-3 py-1">
            <h4 className="px-3 text-[10px] font-bold tracking-wider text-muted-foreground/75 uppercase">
                {title}
            </h4>
            <div className="space-y-0.5">
                {items.map((item) => (
                    <Button
                        key={item.href}
                        variant={pathname === item.href ? 'secondary' : 'ghost'}
                        className="w-full justify-start h-9 text-xs"
                        asChild
                    >
                        <Link href={item.href}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    );

    // Penulis role: only Dashboard + Berita
    const penulisGeneralItems = [
        { href: '/admin', label: 'Dasbor', icon: Home },
    ];
    const penulisContentItems = [
        { href: '/admin/berita', label: 'Berita', icon: Newspaper },
    ];

    return (
        <nav className="space-y-3">
            {role === 'penulis' ? (
                <>
                    {renderNavGroup('Menu Utama', penulisGeneralItems)}
                    {renderNavGroup('Kelola Konten', penulisContentItems)}
                </>
            ) : (
                <>
                    {renderNavGroup('Menu Utama', generalItems)}
                    {renderNavGroup('Kelola Konten & Berita', contentItems)}
                    {renderNavGroup('Tampilan & Struktur', layoutItems)}
                </>
            )}
            
            {role === 'admin' && (
                <div className="space-y-1.5 px-3 py-1">
                    <h4 className="px-3 text-[10px] font-bold tracking-wider text-muted-foreground/75 uppercase">
                        Admin System
                    </h4>
                    <div className="space-y-0.5">
                        {adminNavItems.map((item) => (
                            <Button
                                key={item.href}
                                variant={pathname === item.href ? 'secondary' : 'ghost'}
                                className="w-full justify-start h-9 text-xs"
                                asChild
                            >
                                <Link href={item.href}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

function MobileNavGroup({ title, items, onClose }: { title: string; items: typeof generalItems; onClose: () => void }) {
    return (
        <div className="space-y-1.5">
            <p className="text-[10px] font-bold tracking-wider text-muted-foreground/75 uppercase px-2.5">{title}</p>
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-4 px-2.5 py-1.5 text-muted-foreground hover:text-foreground rounded-md transition-colors"
                    onClick={onClose}
                >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                </Link>
            ))}
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const auth = useAuth();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { userProfile } = useUserProfile();

    return (
        <ProtectedRoute>
            <div className="flex h-screen w-full overflow-hidden bg-muted/40">
                {/* Desktop Sidebar */}
                <aside className="hidden h-full w-64 flex-col border-r bg-background sm:flex">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link href="/admin" className="flex items-center gap-2 font-semibold">
                            <Newspaper className="h-6 w-6 text-primary" />
                            <span>Admin Panel</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <SidebarNav />
                    </div>
                    <div className="border-t p-2">
                        <Button
                            variant={pathname === '/admin/settings' ? 'secondary' : 'ghost'}
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href="/admin/settings">
                                <Settings className="mr-2 h-4 w-4" />
                                Pengaturan
                            </Link>
                        </Button>
                    </div>
                </aside>

                <div className="flex flex-1 flex-col overflow-hidden">
                    {/* Mobile Header */}
                    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4 sm:h-[60px] sm:px-6">
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button size="icon" variant="outline" className="sm:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="sm:max-w-xs">
                                <nav className="grid gap-6 text-lg font-medium">
                                    <Link
                                        href="/admin"
                                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Newspaper className="h-5 w-5 transition-all group-hover:scale-110" />
                                        <span className="sr-only">Admin Panel</span>
                                    </Link>
                                    <div className="flex flex-col gap-4 text-sm mt-4">
                                        {userProfile?.role === 'penulis' ? (
                                            <>
                                                <MobileNavGroup title="Menu Utama" items={[{ href: '/admin', label: 'Dasbor', icon: Home }]} onClose={() => setMobileMenuOpen(false)} />
                                                <MobileNavGroup title="Kelola Konten" items={[{ href: '/admin/berita', label: 'Berita', icon: Newspaper }]} onClose={() => setMobileMenuOpen(false)} />
                                            </>
                                        ) : (
                                            <>
                                                <MobileNavGroup title="Menu Utama" items={generalItems} onClose={() => setMobileMenuOpen(false)} />
                                                <MobileNavGroup title="Kelola Konten & Berita" items={contentItems} onClose={() => setMobileMenuOpen(false)} />
                                                <MobileNavGroup title="Tampilan & Struktur" items={layoutItems} onClose={() => setMobileMenuOpen(false)} />
                                            </>
                                        )}
                                        {userProfile?.role === 'admin' && (
                                            <MobileNavGroup title="Admin System" items={adminNavItems} onClose={() => setMobileMenuOpen(false)} />
                                        )}
                                    </div>
                                    <Link
                                        href="/admin/settings"
                                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Settings className="h-5 w-5" />
                                        Pengaturan
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <div className="relative ml-auto flex-1 md:grow-0">
                            {/* Can add a search bar here if needed */}
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                                    <Avatar>
                                        <AvatarImage src={userProfile?.avatar || "https://placehold.co/32x32"} alt="Avatar" />
                                        <AvatarFallback><UserIcon /></AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{userProfile?.username || 'Akun Saya'}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href="/admin/settings">
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Pengaturan
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={async () => {
                                    await api.logout();
                                    window.location.href = '/login';
                                }}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Keluar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
