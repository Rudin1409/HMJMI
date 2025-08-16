
'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Users, Briefcase, Award, Tv, Handshake, Store, Megaphone, Instagram, Linkedin, Code, ArrowUpRight, Bot, Network, Palette, BarChart3, Heart, Wallet, UserCheck, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const departments = [
  { id: 'inti', name: 'Inti (BPH)', fullName: 'Badan Pengurus Harian', icon: <Award className="w-8 h-8 text-primary" />, description: 'Bertanggung jawab atas koordinasi umum dan arah strategis organisasi.' },
  { id: 'ptkp', name: 'PTKP', fullName: 'PERGURUAN TINGGI DAN KEPEMUDAAN', icon: <Code className="w-8 h-8 text-primary" />, description: 'Departemen Perguruan Tinggi dan Kepemudaan (PTKP), yaitu keanggotaan yang mempunyai tugas dalam mengelola Akademik dan kepemudaan di lingkungan Manajemen Informatika Politeknik Negeri Sriwijaya yang diangkat oleh Badan Pengurus Harian.' },
  { id: 'humas', name: 'Humas', fullName: 'Hubungan Masyarakat', icon: <Megaphone className="w-8 h-8 text-primary" />, description: 'Hubungan Masyarakat, menjalin komunikasi dengan pihak eksternal.' },
  { id: 'psdm', name: 'PSDM', fullName: 'Pengembangan Sumber Daya Mahasiswa', icon: <Users className="w-8 h-8 text-primary" />, description: 'Pengembangan Sumber Daya Mahasiswa, fokus pada soft skill dan kaderisasi.' },
  { id: 'kesma', name: 'Kesma', fullName: 'Kesejahteraan Mahasiswa', icon: <Heart className="w-8 h-8 text-primary" />, description: 'Kesejahteraan Mahasiswa, mendukung kebutuhan dan kesejahteraan mahasiswa.' },
  { id: 'bistra', name: 'Bistra', fullName: 'Bisnis dan Kemitraan', icon: <Store className="w-8 h-8 text-primary" />, description: 'Bisnis dan Kemitraan, mengembangkan potensi kewirausahaan dan kemitraan.' },
];

const teamMembers = {
  inti: {
    heads: [
      { name: 'Mgs. A. Farid Al-Kautsar', role: 'Ketua Umum', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi", email: "dzafa50@gmail.com" },
      { name: 'M. Hafizh Al-Ghariz', role: 'Wakil Ketua Umum', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi", email: "dzafa50@gmail.com" },
    ],
    members: []
  },
  ptkp: {
    heads: [
        { name: 'Kepala Dept. PTKP', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi", email: "dzafa50@gmail.com" },
    ],
    members: [
        { name: 'Anggota PTKP 1', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi", email: "dzafa50@gmail.com" },
        { name: 'Anggota PTKP 2', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi", email: "dzafa50@gmail.com" },
    ]
  },
  humas: {
     heads: [
        { name: 'Kepala Dept. Humas', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi", email: "dzafa50@gmail.com" },
     ],
     members: [
        { name: 'Anggota Humas 1', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi", email: "dzafa50@gmail.com" },
     ]
  },
  psdm: {
      heads: [
        { name: 'Kepala Dept. PSDM', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi", email: "dzafa50@gmail.com" },
      ],
      members: [
        { name: 'Anggota PSDM 1', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi", email: "dzafa50@gmail.com" },
      ]
  },
  kesma: {
      heads: [
        { name: 'Kepala Dept. Kesma', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi", email: "dzafa50@gmail.com" },
      ],
      members: [
        { name: 'Anggota Kesma 1', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi", email: "dzafa50@gmail.com" },
      ]
  },
  bistra: {
      heads: [
        { name: 'Kepala Dept. Bistra', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi", email: "dzafa50@gmail.com" },
      ],
      members: [
        { name: 'Anggota Bistra 1', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi", email: "dzafa50@gmail.com" },
      ]
  }
};


const programs = {
    inti: [
        { title: 'Musyawarah Besar', category: 'INTERNAL', description: 'Agenda tahunan untuk evaluasi kepengurusan dan pemilihan ketua umum baru.', image: 'https://placehold.co/400x200.png', hint: 'organization meeting' },
        { title: 'Rapat Kerja', category: 'INTERNAL', description: 'Menyusun dan menyelaraskan program kerja untuk satu periode kepengurusan.', image: 'https://placehold.co/400x200.png', hint: 'work meeting' }
    ],
    ptkp: [
        { title: 'Webinar Teknologi', category: 'AKADEMIK', description: 'Seminar online dengan topik terkini di dunia IT untuk meningkatkan wawasan.', image: 'https://placehold.co/400x200.png', hint: 'tech webinar' },
        { title: 'Pelatihan Coding', category: 'AKADEMIK', description: 'Workshop intensif untuk mengasah kemampuan pemrograman mahasiswa.', image: 'https://placehold.co/400x200.png', hint: 'coding workshop' }
    ],
    humas: [
        { title: 'Kunjungan Industri', category: 'EKSTERNAL', description: 'Mengunjungi perusahaan teknologi untuk memperluas wawasan dunia kerja.', image: 'https://placehold.co/400x200.png', hint: 'industry visit' },
        { title: 'Studi Banding', category: 'EKSTERNAL', description: 'Bertukar wawasan dan pengalaman dengan organisasi mahasiswa lain.', image: 'https://placehold.co/400x200.png', hint: 'student exchange' }
    ],
    psdm: [
        { title: 'LKMM-PD', category: 'PELATIHAN', description: 'Latihan Keterampilan Manajemen Mahasiswa - Pra Dasar untuk kaderisasi.', image: 'https://placehold.co/400x200.png', hint: 'leadership training' },
        { title: 'MI CUP', category: 'MINAT BAKAT', description: 'Kompetisi olahraga dan seni untuk mahasiswa Manajemen Informatika.', image: 'https://placehold.co/400x200.png', hint: 'student competition' }
    ],
    kesma: [
        { title: 'Bakti Sosial', category: 'SOSIAL', description: 'Kegiatan sosial untuk membantu masyarakat sekitar dan menumbuhkan empati.', image: 'https://placehold.co/400x200.png', hint: 'social charity' },
        { title: 'Penggalangan Dana', category: 'SOSIAL', description: 'Mengumpulkan donasi untuk membantu yang membutuhkan akibat bencana atau musibah.', image: 'https://placehold.co/400x200.png', hint: 'fundraising event' }
    ],
    bistra: [
        { title: 'Bazar Kewirausahaan', category: 'BISNIS', description: 'Mengadakan bazar untuk mendorong semangat dan kreativitas wirausaha.', image: 'https://placehold.co/400x200.png', hint: 'entrepreneur bazaar' },
        { title: 'Pelatihan Kewirausahaan', category: 'BISNIS', description: 'Memberikan pembekalan dan strategi bisnis bagi mahasiswa yang tertarik berwirausaha.', image: 'https://placehold.co/400x200.png', hint: 'business workshop' }
    ]
};

const divisions = {
  ptkp: [
    { id: 'kepemudaan', name: 'Divisi Kepemudaan', description: 'bertugas memantau isu-isu yang berkembang dan mewakili mahasiswa dalam menyampaikan permasalahan tersebut di lingkungan jurusan Manajemen Informatika.' },
    { id: 'akademik', name: 'Divisi Akademik', description: 'Mengkoordinir sumber daya mahasiswa dibidang akademik guna mewujudkan mahasiswa yang cerdas dan aktif' },
  ],
  humas: [
    { id: 'multimedia', name: 'Divisi Multimedia', description: 'Divisi Multimedia atau Divisi Mulmed adalah divisi yang bertanggung jawab atas pengelolaan dan produksi konten multimedia.' },
    { id: 'infokom', name: 'Divisi Informasi dan Komunikasi', description: 'Bertugas menyebarkan informasi penting dari himpunan ke mahasiswa dan menjaga citra organisasi di media sosial.' },
  ],
  psdm: [
    { id: 'kaderisasi', name: 'Divisi Kaderisasi', description: 'Berperan dalam proses rekrutmen dan pembinaan anggota baru agar sesuai dengan nilai-nilai himpunan.' },
    { id: 'minatbakat', name: 'Divisi Minat dan Bakat', description: 'Mewadahi dan mengembangkan potensi mahasiswa di bidang non-akademik seperti olahraga, seni, dan lainnya.' },
  ],
  kesma: [
    { id: 'advokasi', name: 'Divisi Advokasi', description: 'Menjembatani aspirasi dan keluhan mahasiswa kepada pihak jurusan atau politeknik.' },
    { id: 'sosial', name: 'Divisi Sosial', description: 'Mengadakan kegiatan sosial dan pengabdian masyarakat sebagai bentuk kepedulian terhadap lingkungan sekitar.' },
  ],
  bistra: [
    { id: 'danus', name: 'Divisi Dana dan Usaha', description: 'Bertanggung jawab untuk mencari sumber pendanaan dan mengelola keuangan himpunan secara mandiri.' },
    { id: 'kemitraan', name: 'Divisi Kemitraan', description: 'Menjalin dan menjaga hubungan baik dengan sponsor, alumni, dan pihak eksternal lainnya untuk mendukung kegiatan himpunan.' },
  ],
};

type Member = {
    name: string;
    role: string;
    class: string;
    avatar: string;
    instagram?: string;
    email?: string;
};

const MemberCard = ({ member, isFeatured = false, onSelect, className }: { member: Member, isFeatured?: boolean, onSelect?: () => void, className?: string }) => {
    if (isFeatured) {
        return (
            <div className={cn("grid md:grid-cols-2 items-center gap-8 w-full", className)}>
                <div className="relative aspect-square max-w-sm mx-auto cursor-pointer" onClick={onSelect}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full border-8 border-primary/50 rounded-full"></div>
                    </div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[calc(100%-40px)] h-[calc(100%-40px)] border-4 border-primary/30 rounded-full"></div>
                    </div>
                    <Image src={member.avatar} alt={member.name} width={400} height={400} className="rounded-full object-cover relative z-10 p-2 bg-pink-50/30" data-ai-hint="headshot portrait" />
                </div>
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <h3 className="text-3xl font-bold text-primary">{member.role}</h3>
                    <p className="text-xl font-semibold text-gray-800">{member.name}</p>
                    <p className="text-muted-foreground">{member.class}</p>
                    <div className="flex flex-col gap-2 mt-4 items-center md:items-start">
                        {member.instagram && (
                             <a href={`https://instagram.com/${member.instagram}`} target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span>{member.instagram}</span>
                            </a>
                        )}
                        {member.email && (
                            <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="h-5 w-5" />
                                <span>{member.email}</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={cn("relative aspect-square w-32 cursor-pointer", className)} onClick={onSelect}>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full border-4 border-primary/50 rounded-full"></div>
            </div>
            <Image src={member.avatar} alt={member.name} width={150} height={150} className="rounded-full object-cover relative z-10 p-1 bg-pink-50/30" data-ai-hint="headshot portrait" />
        </div>
    )
};


export default function ProfilePage() {
  const [activeDept, setActiveDept] = useState(departments[0]);
  const [activeView, setActiveView] = useState('members');
  
  const currentDepartmentData = teamMembers[activeDept.id as keyof typeof teamMembers] || { heads: [], members: [] };
  const allMembers: Member[] = [...currentDepartmentData.heads, ...currentDepartmentData.members];
  const [featuredMember, setFeaturedMember] = useState<Member | null>(allMembers[0] || null);

  const currentPrograms = programs[activeDept.id as keyof typeof programs] || [];
  const currentDivisions = divisions[activeDept.id as keyof typeof divisions] || [];
  
  const otherMembers = allMembers.filter(member => member.name !== featuredMember?.name);

  React.useEffect(() => {
    const newAllMembers = [...(teamMembers[activeDept.id as keyof typeof teamMembers]?.heads || []), ...(teamMembers[activeDept.id as keyof typeof teamMembers]?.members || [])];
    setFeaturedMember(newAllMembers[0] || null);
  }, [activeDept]);


  return (
    <div className="flex flex-col bg-pink-50/30">
      <section
        id="hero-profile"
        className="relative w-full bg-background flex items-center justify-center min-h-screen overflow-hidden"
      >
        <div className="container mx-auto px-4">
            <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-8 min-h-screen">
                <div className="absolute w-72 h-72 bg-pink-100/50 rounded-full -top-10 -left-20 blur-2xl"></div>
                <div className="absolute w-72 h-72 bg-blue-100/50 rounded-full -bottom-10 -right-20 blur-2xl"></div>

                <div className="relative z-10 text-center md:text-left">
                    <Badge variant="default" className="mb-4 bg-pink-100 text-primary">
                        Tim Kami
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
                        Kekuatan Kami <span className="text-primary">Terletak Pada Tim</span>
                    </h1>
                    <p className="mt-4 max-w-md mx-auto md:mx-0 text-lg text-muted-foreground">
                        Kami persembahkan jajaran kabinet HMJMI yang penuh semangat! Bersama, kita wujudkan perubahan dan inovasi untuk masa depan yang lebih baik.
                    </p>
                </div>
                
                <div className="relative h-full flex items-center justify-center">
                    <div className="absolute w-40 h-40 bg-yellow-200/50 rounded-full top-20 right-1/2 blur-xl"></div>
                    <div className="absolute w-40 h-40 bg-pink-200/50 rounded-full bottom-20 left-1/2 blur-xl"></div>

                    <div className="relative w-full h-[500px]">
                        <div className="absolute top-0 left-10 w-48 h-48">
                            <Image src="https://placehold.co/300x300.png" width={300} height={300} alt="Team Photo 1" className="rounded-full object-cover shadow-lg border-4 border-white" data-ai-hint="student group"/>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-60 h-60">
                             <Image src="https://placehold.co/400x400.png" width={400} height={400} alt="Team Photo 2" className="rounded-full object-cover shadow-2xl border-8 border-white" data-ai-hint="team meeting"/>
                        </div>
                         <div className="absolute bottom-0 right-10 w-52 h-52">
                             <Image src="https://placehold.co/300x300.png" width={300} height={300} alt="Team Photo 3" className="rounded-full object-cover shadow-lg border-4 border-white" data-ai-hint="university event"/>
                        </div>
                         <div className="absolute top-20 right-0 w-32 h-32">
                             <Image src="https://placehold.co/200x200.png" width={200} height={200} alt="Team Photo 4" className="rounded-full object-cover shadow-md border-2 border-white" data-ai-hint="group discussion"/>
                        </div>
                        <div className="absolute bottom-10 left-0 w-36 h-36">
                            <Image src="https://placehold.co/200x200.png" width={200} height={200} alt="Team Photo 5" className="rounded-full object-cover shadow-md border-2 border-white" data-ai-hint="students collaborating"/>
                        </div>
                    </div>
                </div>

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
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center flex flex-col items-center mb-12">
            <div className="relative w-24 h-24 mb-4">
              <Image src="https://placehold.co/100x100.png" layout="fill" alt={`${activeDept.name} Logo`} className="rounded-full" data-ai-hint="organization logo" />
            </div>
            <h2 className="text-4xl font-bold text-primary mb-2">{activeDept.fullName}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">{activeDept.description}</p>
             <div className="flex justify-center mb-4">
              <div className="w-16 h-0.5 bg-primary/50 rounded-full"></div>
            </div>

            {activeDept.id !== 'inti' && currentDivisions.length > 0 && (
              <Accordion type="single" collapsible className="w-full max-w-2xl mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Divisi</h3>
                   {currentDivisions.map((division) => (
                      <AccordionItem key={division.id} value={division.id} className="bg-white/60 border-b-2 rounded-lg mb-2 px-4">
                          <AccordionTrigger className="text-left font-semibold hover:no-underline">{division.name}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                              {division.description}
                          </AccordionContent>
                      </AccordionItem>
                   ))}
              </Accordion>
            )}

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
             <div className="space-y-8 flex flex-col items-center">
                {featuredMember ? (
                  <>
                    <MemberCard member={featuredMember} isFeatured />

                    {otherMembers.length > 0 && (
                        <div className="w-full pt-8 mt-8 border-t border-primary/20">
                            <div className="flex gap-4 justify-center flex-wrap">
                                {otherMembers.map((member, index) => (
                                    <MemberCard key={index} member={member} onSelect={() => setFeaturedMember(member)} />
                                ))}
                            </div>
                        </div>
                    )}
                  </>
                ) : (
                    <p className="text-muted-foreground text-center">Belum ada anggota yang tersedia untuk departemen ini.</p>
                )}
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
