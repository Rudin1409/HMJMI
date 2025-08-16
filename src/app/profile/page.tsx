
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Users, Briefcase, Award, Tv, Handshake, Store, Megaphone, Instagram, Linkedin, Code, ArrowUpRight, Bot, Network, Palette, BarChart3, Heart, Wallet, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const departments = [
  { id: 'inti', name: 'Inti (BPI)', icon: <Award className="w-8 h-8 text-primary" />, description: 'Bertanggung jawab atas koordinasi umum dan arah strategis organisasi.' },
  { id: 'ptpk', name: 'PTPK', icon: <Code className="w-8 h-8 text-primary" />, description: 'Pengembangan Teknologi dan Penalaran Keilmuan, fokus pada inovasi teknologi.' },
  { id: 'humas', name: 'Humas', icon: <Megaphone className="w-8 h-8 text-primary" />, description: 'Hubungan Masyarakat, menjalin komunikasi dengan pihak eksternal.' },
  { id: 'psdm', name: 'PSDM', icon: <Users className="w-8 h-8 text-primary" />, description: 'Pengembangan Sumber Daya Mahasiswa, fokus pada soft skill dan kaderisasi.' },
  { id: 'kesma', name: 'Kesma', icon: <Heart className="w-8 h-8 text-primary" />, description: 'Kesejahteraan Mahasiswa, mendukung kebutuhan dan kesejahteraan mahasiswa.' },
  { id: 'bistra', name: 'Bistra', icon: <Store className="w-8 h-8 text-primary" />, description: 'Bisnis dan Kemitraan, mengembangkan potensi kewirausahaan dan kemitraan.' },
];

const teamMembers = {
  inti: [
    { name: 'Mgs. A. Farid Al-Kautsar', role: 'Ketua Umum', class: 'MI 2022', avatar: 'https://placehold.co/150x150' },
    { name: 'M. Hafizh Al-Ghariz', role: 'Wakil Ketua Umum', class: 'MI 2022', avatar: 'https://placehold.co/150x150' },
  ],
  ptpk: [
    { name: 'Anggota PTPK 1', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/150x150' },
    { name: 'Anggota PTPK 2', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/150x150' },
  ],
  humas: [
     { name: 'Anggota Humas 1', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/150x150' },
  ],
  psdm: [
      { name: 'Anggota PSDM 1', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/150x150' },
  ],
  kesma: [
      { name: 'Anggota Kesma 1', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/150x150' },
  ],
  bistra: [
      { name: 'Anggota Bistra 1', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/150x150' },
  ]
};

const programs = {
    inti: [
        { title: 'Musyawarah Besar', category: 'INTERNAL', description: 'Agenda tahunan untuk evaluasi kepengurusan dan pemilihan ketua umum baru.', image: 'https://placehold.co/400x200', hint: 'organization meeting' }
    ],
    ptpk: [
        { title: 'Webinar Teknologi', category: 'AKADEMIK', description: 'Seminar online dengan topik terkini di dunia IT untuk meningkatkan wawasan.', image: 'https://placehold.co/400x200', hint: 'tech webinar' },
        { title: 'Pelatihan Coding', category: 'AKADEMIK', description: 'Workshop intensif untuk mengasah kemampuan pemrograman mahasiswa.', image: 'https://placehold.co/400x200', hint: 'coding workshop' }
    ],
    humas: [
        { title: 'Kunjungan Industri', category: 'EKSTERNAL', description: 'Mengunjungi perusahaan teknologi untuk memperluas wawasan dunia kerja.', image: 'https://placehold.co/400x200', hint: 'industry visit' }
    ],
    psdm: [
        { title: 'LKMM-PD', category: 'PELATIHAN', description: 'Latihan Keterampilan Manajemen Mahasiswa - Pra Dasar untuk kaderisasi.', image: 'https://placehold.co/400x200', hint: 'leadership training' },
        { title: 'MI CUP', category: 'MINAT BAKAT', description: 'Kompetisi olahraga dan seni untuk mahasiswa Manajemen Informatika.', image: 'https://placehold.co/400x200', hint: 'student competition' }
    ],
    kesma: [
        { title: 'Bakti Sosial', category: 'SOSIAL', description: 'Kegiatan sosial untuk membantu masyarakat sekitar dan menumbuhkan empati.', image: 'https://placehold.co/400x200', hint: 'social charity' }
    ],
    bistra: [
        { title: 'Bazar Kewirausahaan', category: 'BISNIS', description: 'Mengadakan bazar untuk mendorong semangat dan kreativitas wirausaha.', image: 'https://placehold.co/400x200', hint: 'entrepreneur bazaar' }
    ]
};

export default function ProfilePage() {
  const [activeDept, setActiveDept] = useState(departments[0]);
  const [activeView, setActiveView] = useState('members');
  
  const currentMembers = teamMembers[activeDept.id as keyof typeof teamMembers] || [];
  const currentPrograms = programs[activeDept.id as keyof typeof programs] || [];

  return (
    <div className="flex flex-col bg-pink-50/30">
      <section
        id="hero-profile"
        className="relative w-full bg-gradient-to-b from-pink-100/50 to-pink-50/30 pt-28 pb-16"
      >
        <div className="container mx-auto px-4 text-center">
          <Badge variant="default" className="mb-4 bg-pink-100 text-primary">
            Tim Kami
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Kekuatan Kami <span className="text-primary">Terletak Pada Tim</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Kami persembahkan jajaran kabinet HMJMI yang penuh semangat! Bersama, kita wujudkan perubahan dan inovasi untuk masa depan yang lebih baik.
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
              Jelajahi <span className="text-primary">Kabinet Kami</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Temukan berbagai departemen yang ada di HMJMI POLSRI, masing-masing dengan fokus dan program unggulan yang berbeda untuk pengembangan mahasiswa.
            </p>
          </div>

          <Card className="max-w-5xl mx-auto p-6 md:p-8 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-primary text-xl font-bold">*</span>
                <h3 className="text-xl font-bold text-center text-gray-700">Departemen</h3>
                <span className="text-primary text-xl font-bold">*</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {departments.map((dept) => (
                  <button key={dept.id} onClick={() => setActiveDept(dept)}>
                    <Card className={cn(
                      'text-center p-4 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl hover:scale-105 h-full',
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
              <Button 
                size="lg"
                onClick={() => setActiveView('members')}
                className={cn(
                  'rounded-full',
                  activeView === 'members' ? 'bg-pink-100 text-primary border border-primary/20 hover:bg-primary hover:text-white' : ''
                )}
                variant={activeView === 'members' ? 'default' : 'outline'}
              >
                <Users className="mr-2 h-4 w-4" /> Anggota
              </Button>
              <Button
                size="lg"
                onClick={() => setActiveView('programs')}
                className={cn(
                    'rounded-full',
                    activeView === 'programs' ? 'bg-pink-100 text-primary border border-primary/20 hover:bg-primary hover:text-white' : ''
                )}
                variant={activeView === 'programs' ? 'default' : 'outline'}
               >
                <Briefcase className="mr-2 h-4 w-4" /> Program
              </Button>
            </div>
          </div>
          
          {activeView === 'members' && (
            <div>
              <div className="text-center mb-8">
                 <h3 className="text-2xl font-bold text-gray-800 relative inline-block">
                    Badan Pengurus Harian
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-primary/50 rounded-full"></span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-center">
                {currentMembers.map((member, index) => (
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
          )}

          {activeView === 'programs' && (
            <div>
              <div className="text-center mb-8">
                 <h3 className="text-2xl font-bold text-gray-800 relative inline-block">
                    Program Kerja
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-primary/50 rounded-full"></span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {currentPrograms.length > 0 ? (
                  currentPrograms.map((program, index) => (
                      <Card key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                          <CardContent className="p-0">
                               <div className="relative aspect-video">
                                  <Image src={program.image} layout="fill" objectFit="cover" alt={program.title} data-ai-hint={program.hint}/>
                                  <div className="absolute top-2 right-2">
                                       <Badge className="bg-yellow-300 text-yellow-900 font-bold">{program.category}</Badge>
                                  </div>
                              </div>
                              <div className="p-6">
                                  <h4 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h4>
                                  <p className="text-muted-foreground mb-4 text-sm">
                                    {program.description}
                                  </p>
                                  <Button variant="link" className="text-primary p-0 h-auto">
                                      Lihat Detail <ArrowUpRight className="ml-1 h-4 w-4" />
                                  </Button>
                              </div>
                          </CardContent>
                      </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-full text-center">Belum ada program kerja yang tersedia untuk departemen ini.</p>
                )}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
    