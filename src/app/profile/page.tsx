
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Users, Briefcase, Award, Tv, Handshake, Store, Megaphone, Instagram, Linkedin, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

const departments = [
  { id: 'inti', name: 'Inti', icon: <Award className="w-8 h-8 text-primary" />, description: 'Departemen ini bertanggung jawab untuk mengelola berbagai program dan kegiatan HMIF.' },
  { id: 'akademik', name: 'Akademik', icon: <Code className="w-8 h-8 text-primary" />, description: 'Departemen yang berfokus pada pengembangan kemampuan akademik mahasiswa.' },
  { id: 'psdm', name: 'PSDM', icon: <Users className="w-8 h-8 text-primary" />, description: 'Pengembangan Sumber Daya Mahasiswa, untuk meningkatkan soft skill.' },
  { id: 'adm', name: 'ADM', icon: <Briefcase className="w-8 h-8 text-primary" />, description: 'Administrasi dan kesekretariatan organisasi.' },
  { id: 'kominfo', name: 'Kominfo', icon: <Tv className="w-8 h-8 text-primary" />, description: 'Komunikasi dan Informasi, mengelola media sosial dan publikasi.' },
  { id: 'pmb', name: 'PMB', icon: <Handshake className="w-8 h-8 text-primary" />, description: 'Pengembangan Minat dan Bakat mahasiswa.' },
  { id: 'kwu', name: 'KWU', icon: <Store className="w-8 h-8 text-primary" />, description: 'Kewirausahaan, mendorong jiwa bisnis mahasiswa.' },
  { id: 'kastrad', name: 'Kastrad', icon: <Megaphone className="w-8 h-8 text-primary" />, description: 'Kajian Strategis dan Advokasi, menyikapi isu-isu strategis.' },
];

const teamMembers = [
  { name: 'Saravina Zharfa Kelana Putri', role: 'Bendahara Umum I', class: 'BILA 2023', avatar: 'https://placehold.co/150x150' },
  { name: 'Putri Aisya Zhafirah', role: 'Bendahara Umum II', class: 'BILA 2023', avatar: 'https://placehold.co/150x150' },
  { name: 'Muhammad Fattahul Aziz', role: 'Ketua Himpunan', class: 'BIL A 2023', avatar: 'https://placehold.co/150x150' },
  { name: 'Adhia Rihal Sulaiman', role: 'Wakil Ketua Himpunan', class: 'REG A 2023', avatar: 'https://placehold.co/150x150' },
  { name: 'Aditya', role: 'Anggota', class: 'REG A 2023', avatar: 'https://placehold.co/150x150' },
];

export default function ProfilePage() {
  const [activeDept, setActiveDept] = useState(departments[0]);

  return (
    <div className="flex flex-col bg-pink-50/30">
      <section
        id="hero-profile"
        className="relative w-full bg-gradient-to-b from-pink-100/50 to-pink-50/30 pt-28 pb-16"
      >
        <div className="container mx-auto px-4 text-center">
          <Badge variant="default" className="mb-4 bg-pink-100 text-primary">
            Our Team
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Our Strength <span className="text-primary">Lies In Our Team</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Kami persembahkan jajaran kabinet HMIF yang penuh semangat! Bersama, kita kuatkan formasi dan wujudkan inovasi!
          </p>
          <div className="mt-8">
            <Button variant="ghost" size="icon" className="rounded-full bg-pink-100 text-primary hover:bg-pink-200 animate-bounce">
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      <section id="explore-cabinet" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Explore <span className="text-primary">Our Cabinet</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Temukan berbagai departemen dan divisi yang ada di HMIF UNSRI, masing-masing dengan fokus dan program unggulan yang berbeda untuk pengembangan mahasiswa informatika.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto p-6 md:p-8 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-primary text-xl font-bold">*</span>
                <h3 className="text-xl font-bold text-center text-gray-700">Departments</h3>
                <span className="text-primary text-xl font-bold">*</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {departments.map((dept) => (
                  <button key={dept.id} onClick={() => setActiveDept(dept)}>
                    <Card className={cn(
                      'text-center p-4 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl hover:scale-105',
                      activeDept.id === dept.id ? 'bg-primary text-primary-foreground shadow-primary/40' : 'bg-white'
                    )}>
                      <CardContent className="p-0 flex flex-col items-center gap-2">
                        <div className={cn(
                          'p-3 rounded-full transition-colors',
                           activeDept.id === dept.id ? 'bg-white/20 [&>svg]:text-white' : 'bg-pink-100 [&>svg]:text-primary'
                        )}>
                           {dept.icon}
                        </div>
                        <h4 className="font-bold text-sm">{dept.name}</h4>
                        <p className={cn(
                           "text-xs",
                           activeDept.id === dept.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                        )}>Departemen HMIF</p>
                      </CardContent>
                    </Card>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="department-details" className="w-full pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center flex flex-col items-center mb-12">
            <div className="relative w-24 h-24 mb-4">
              <Image src="https://placehold.co/100x100" layout="fill" alt={`${activeDept.name} Logo`} className="rounded-full" data-ai-hint="organization logo" />
            </div>
            <h2 className="text-4xl font-bold text-primary mb-2">{activeDept.name}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">{activeDept.description}</p>
             <div className="flex justify-center mb-4">
              <div className="w-16 h-0.5 bg-primary/50 rounded-full"></div>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="rounded-full bg-pink-100 text-primary border border-primary/20 hover:bg-primary hover:text-white">
                <Users className="mr-2 h-4 w-4" /> Members
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                <Briefcase className="mr-2 h-4 w-4" /> Programs
              </Button>
            </div>
          </div>
          
          <div className="text-center mb-8">
             <h3 className="text-2xl font-bold text-gray-800 relative inline-block">
                Badan Pengurus Harian
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-primary/50 rounded-full"></span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow bg-white rounded-2xl flex flex-col items-center">
                <CardContent className="p-0 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full transform -rotate-12"></div>
                        <div className="absolute inset-0.5 bg-white rounded-full p-1">
                            <Image src={member.avatar} alt={member.name} width={150} height={150} className="rounded-full object-cover" data-ai-hint="headshot portrait" />
                        </div>
                    </div>
                  <h4 className="font-bold text-lg text-gray-800">{member.name}</h4>
                  <p className="text-primary font-medium text-sm mb-1">{member.role}</p>
                  <p className="text-muted-foreground text-xs mb-3">{member.class}</p>
                  <div className="flex gap-3">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
