
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, Award, Instagram, ArrowUpRight, GraduationCap, Megaphone, Sparkles, HeartHandshake, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const departments = [
  { id: 'inti', name: 'Inti (BPH)', fullName: 'Badan Pengurus Harian', icon: <Award className="w-8 h-8" />, description: 'Bertanggung jawab atas koordinasi umum dan arah strategis organisasi.' },
  { id: 'ptkp', name: 'PTKP', fullName: 'Perguruan Tinggi dan Kepemudaan', icon: <GraduationCap className="w-8 h-8" />, description: 'Departemen Perguruan Tinggi dan Kepemudaan (PTKP), yaitu keanggotaan yang mempunyai tugas dalam mengelola Akademik dan kepemudaan di lingkungan Manajemen Informatika Politeknik Negeri Sriwijaya yang diangkat oleh Badan Pengurus Harian.' },
  { id: 'humas', name: 'Humas', fullName: 'Hubungan Mahasiswa', icon: <Megaphone className="w-8 h-8" />, description: 'Departemen Hubungan Mahasiswa (HUMAS), yaitu keanggotaan biasa yang bertugas dalam bersosialisasi di lingkungan Politeknik Negeri Sriwijaya dan mengelola akun media sosial HMJ MI serta menjadi wadah informasi bagi Jurusan Manajemen Informatika baik informasi dari dalam maupun dari luar jurusan yang diangkat oleh Badan Pengurus Harian.' },
  { id: 'psdm', name: 'PSDM', fullName: 'Pengembangan Sumber Daya Mahasiswa', icon: <Sparkles className="w-8 h-8" />, description: 'Departemen Pengembangan Sumber Daya Manusia (PSDM), yaitu keanggotaan biasa yang mempunyai tugas dalam mengelola, menyalurkan minat dan bakat di bidang non-akademik serta mengawasi anggota kepengurusan HMJ MI menjadi lebih baik di lingkungan Manajemen Informatika yang diangkat oleh Badan Pengurus Harian.' },
  { id: 'kesma', name: 'Kesma', fullName: 'Kesejahteraan Mahasiswa', icon: <HeartHandshake className="w-8 h-8" />, description: 'Departemen Kesejahteraan Mahasiswa (KESMA), yaitu keanggotaan biasa yang bertugas dalam mensejahterakan mahasiswa dan membangun sisi religius serta jiwa sosial di lingkungan Manajemen Informatika yang diangkat oleh Badan Pengurus Harian.' },
  { id: 'bistra', name: 'Bistra', fullName: 'Bisnis dan Kemitraan', icon: <Store className="w-8 h-8" />, description: 'Departemen Bisnis dan Kemitraan (BISTRA), yaitu keanggotaan biasa yang bertugas dalam mengelola usaha dari mahasiswa dan mengkoordinir kesekretariatan serta melaksanakan pembinaan terkait bisnis di jurusan Manajemen Informatika yang diangkat oleh Badan Pengurus Harian.' },
];

const teamMembers = {
  inti: {
    heads: [
      { name: 'Mgs. A. Farid Al-Kautsar', role: 'Ketua Umum', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
      { name: 'M. Hafizh Al-Ghariz', role: 'Wakil Ketua Umum', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
      { name: 'Sekretaris 1', role: 'Sekretaris', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
      { name: 'Bendahara 1', role: 'Bendahara', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
      { name: 'Koordinator 1', role: 'Koordinator', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
      { name: 'Koordinator 2', role: 'Koordinator', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
    ],
    members: {}
  },
  ptkp: {
    heads: [
        { name: 'Al Fajri Nur Ramadhan', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Agnes', role: 'Wakil Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Shofi Nanda Rismaliani', role: 'Sekretaris', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Lara Amelia Apriani', role: 'Bendahara', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Lenno Nardo', role: 'Koordinator Akademik', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Muhammad Ichwan', role: 'Koordinator Kepemudaan', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
    ],
    members: {
      akademik: [
        { name: 'Devi Aprianti', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'M. Irfan Apriansyah', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Kemas Muhammad Amar Fauzan', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'M. Bahrudin', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Dimas Yuda Pratama', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Niken Septi Andini', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Delvia Apriani', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
      ],
      kepemudaan: [
        { name: 'Miftahul Jannah', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Nis Murib', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Briliana Azizah', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Muhammad Fadlil', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Innayah Dwikhailah Putri', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Irham Bagus Sanjaya', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Muhammad Satria Anugrah', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Rasya Ratu Juanna', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
      ]
    }
  },
  humas: {
     heads: [
        { name: 'Kepala Dept. Humas', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Wakil Dept. Humas', role: 'Wakil Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Sekretaris Humas', role: 'Sekretaris', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Bendahara Humas', role: 'Bendahara', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Koordinator Divisi 1', role: 'Koordinator Divisi', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Koordinator Divisi 2', role: 'Koordinator Divisi', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
     ],
    members: {
      'media-kreatif': Array.from({ length: 4 }, (_, i) => ({ name: `Anggota Medkraf ${i + 1}`, role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" })),
      kominfo: Array.from({ length: 4 }, (_, i) => ({ name: `Anggota Kominfo ${i + 1}`, role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" })),
      jurnalistik: Array.from({ length: 4 }, (_, i) => ({ name: `Anggota Jurnalistik ${i + 1}`, role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" })),
    }
  },
  psdm: {
      heads: [
        { name: 'Kepala Dept. PSDM', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Wakil Dept. PSDM', role: 'Wakil Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Sekretaris PSDM', role: 'Sekretaris', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Bendahara PSDM', role: 'Bendahara', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Koordinator Divisi Minat Bakat', role: 'Koordinator Divisi', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Ketua Pelaksana HRD', role: 'Ketua Pelaksana HRD', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
      ],
    members: {
      minatbakat: Array.from({ length: 12 }, (_, i) => ({ name: `Anggota Minat Bakat ${i + 1}`, role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" })),
    }
  },
  kesma: {
      heads: [
        { name: 'Kepala Dept. Kesma', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Wakil Dept. Kesma', role: 'Wakil Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Sekretaris Kesma', role: 'Sekretaris', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Bendahara Kesma', role: 'Bendahara', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Koordinator Divisi 1', role: 'Koordinator Divisi', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Koordinator Divisi 2', role: 'Koordinator Divisi', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
      ],
    members: {
      agama: Array.from({ length: 6 }, (_, i) => ({ name: `Anggota Agama ${i + 1}`, role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" })),
      sosial: Array.from({ length: 6 }, (_, i) => ({ name: `Anggota Sosial ${i + 1}`, role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" })),
    }
  },
  bistra: {
      heads: [
        { name: 'Kepala Dept. Bistra', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Wakil Dept. Bistra', role: 'Wakil Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Sekretaris Bistra', role: 'Sekretaris', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Bendahara Bistra', role: 'Bendahara', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Koordinator Divisi 1', role: 'Koordinator Divisi', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
        { name: 'Koordinator Divisi 2', role: 'Koordinator Divisi', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" },
      ],
    members: {
      bisnis: Array.from({ length: 6 }, (_, i) => ({ name: `Anggota Bisnis ${i + 1}`, role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" })),
      kemitraan: Array.from({ length: 6 }, (_, i) => ({ name: `Anggota Kemitraan ${i + 1}`, role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "em_dizi" })),
    }
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
    { id: 'akademik', name: 'Divisi Akademik', description: 'Mengkoordinir sumber daya mahasiswa dibidang akademik guna mewujudkan mahasiswa yang cerdas dan aktif' },
    { id: 'kepemudaan', name: 'Divisi Kepemudaan', description: 'bertugas memantau isu-isu yang berkembang dan mewakili mahasiswa dalam menyampaikan permasalahan tersebut di lingkungan jurusan Manajemen Informatika.' },
  ],
  humas: [
    { id: 'media-kreatif', name: 'Media Kreatif', description: 'Media Kreatif (Medkraf) berperan sebagai pusat pengembangan konten visual dan narasi digital. Tanggung jawab utamanya meliputi eksekusi ide kreatif dalam bentuk desain grafis, videografi, fotografi, serta copywriting. Selain itu, divisi ini bertugas mengelola seluruh platform media sosial dan menjadi garda terdepan dalam menyebarluaskan informasi secara inovatif, khususnya untuk lingkungan Jurusan Manajemen Informatika.' },
    { id: 'kominfo', name: 'Komunikasi dan Informasi', description: 'Komunikasi dan Informasi (Kominfo) bertanggung jawab untuk menjadi perwakilan bagi Himpunan Mahasiswa Jurusan Manajemen Informatika dan menjadi wadah informasi yang dibutuhkan oleh seluruh mahasiswa baik dari dalam maupun dari luar Jurusan Manajemen Informatika.' },
    { id: 'jurnalistik', name: 'Jurnalistik', description: 'Divisi Jurnalistik adalah pilar utama dalam penyediaan informasi yang akurat dan terpercaya. Divisi ini bertanggung jawab penuh atas seluruh proses jurnalistik, mulai dari peliputan acara, melakukan wawancara, hingga riset mendalam. Semua informasi yang terkumpul diolah dan disajikan secara objektif dalam bentuk berita, artikel feature, maupun tulisan inspiratif. Tujuannya adalah untuk memastikan seluruh lingkungan Jurusan Manajemen Informatika mendapatkan informasi yang kredibel dan beretika.' },
  ],
  psdm: [
    { id: 'minatbakat', name: 'Minat Bakat', description: 'Minat Bakat berfungsi mendata serta menyalurkan artis dan atlet yang berpotensi di Jurusan Manajemen Informatika.' },
    { id: 'hrd', name: 'HRD', description: 'HRD (Human Resource Development) berfungsi membantu Badan Pengurus Harian dalam mengawasi kepengurusan guna mengoptimalkan kinerja Himpunan Mahasiswa Jurusan Manajemen Informatika.' },
  ],
  kesma: [
    { id: 'agama', name: 'Agama', description: 'Agama merupakan subdivisi yang bergerak dalam hal keagamaan dan bertujuan untuk meningkatkan sisi religius mahasiswa Manajemen Informatika.' },
    { id: 'sosial', name: 'Sosial', description: 'Sosial merupakan subdivisi yang bergerak dalam hal sosial untuk meningkatkan kesejahteraan dan kepedulian mahasiswa Manajemen Informatika.' },
  ],
  bistra: [
    { id: 'bisnis', name: 'Bisnis', description: 'Bisnis berfungsi untuk mengatur jalannya bisnis di dalam lingkungan Manajemen Informatika serta mengelola inventaris sekretariat HMJ Manajemen Informatika Politeknik Negeri Sriwijaya.' },
    { id: 'kemitraan', name: 'Kemitraan', description: 'Kemitraan berfungsi untuk mengatur dan mengelolah jalannnya kerja sama antar divisi bistra dengan usaha dari pihak luar maupun di dalam lingkungan jurusan Manajemen Informatika Politeknik Negeri Sriwijaya.' },
  ],
};

type Member = {
    name: string;
    role: string;
    class: string;
    avatar: string;
    instagram?: string;
};

const MemberCard = ({ member }: { member: Member }) => {
    return (
        <div className="grid md:grid-cols-2 items-center gap-8 w-full">
            <div className="relative mx-auto aspect-square w-full max-w-[280px] flex items-center justify-center">
                <div className="absolute bg-primary rounded-full w-2/3 h-2/3 blur-2xl opacity-50"></div>
                <div className="absolute bg-primary/50 rounded-full w-1/2 h-1/2 top-0 left-0"></div>
                <Image src={member.avatar} alt={member.name} width={400} height={400} className="relative z-10 w-full h-full object-cover rounded-2xl shadow-lg border-4 border-white" data-ai-hint="headshot portrait" />
            </div>
            <div className="flex flex-col gap-2 text-center md:text-left">
                <h3 className="text-3xl font-bold text-primary">{member.role}</h3>
                <p className="text-xl font-semibold text-gray-800">{member.name}</p>
                <p className="text-muted-foreground">{member.class}</p>
                {member.instagram && (
                    <a href={`https://instagram.com/${member.instagram}`} target="_blank" className="inline-flex items-center gap-2 mt-4 text-muted-foreground hover:text-primary transition-colors justify-center md:justify-start">
                        <Instagram className="h-5 w-5" />
                        <span>{member.instagram}</span>
                    </a>
                )}
            </div>
        </div>
    )
};

const SmallMemberCard = ({ member, onSelect, isActive }: { member: Member, onSelect: () => void, isActive: boolean }) => (
    <div className="flex flex-col items-center gap-2">
        <div 
            className={cn(
                "relative aspect-square w-24 md:w-32 cursor-pointer group transition-transform duration-300",
                isActive ? "scale-110" : "hover:scale-105"
            )}
            onClick={onSelect}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <div className={cn(
                    "w-full h-full border-4 rounded-full transition-all duration-300",
                    isActive ? "border-primary" : "border-primary/50 group-hover:border-primary/80"
                )}></div>
            </div>
            <Image src={member.avatar} alt={member.name} width={150} height={150} className="rounded-full object-cover relative z-10 p-1 bg-pink-50/30" data-ai-hint="headshot portrait" />
        </div>
        <p className="text-xs text-center font-semibold text-gray-700 w-24 md:w-32 truncate">{member.name}</p>
    </div>
);


const MemberGroup = ({ title, members, featuredMember, setFeaturedMember, showNavOnDesktop = false }: { title: string, members: Member[], featuredMember: Member | null, setFeaturedMember: (member: Member | null) => void, showNavOnDesktop?: boolean }) => {
    if (!members || members.length === 0) return null;

    const handleSelectMember = (member: Member) => {
        setFeaturedMember(member);
    };

    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-700 text-center">{title}</h3>
            {featuredMember && (
                 <div className="flex justify-center">
                    <MemberCard member={featuredMember} />
                </div>
            )}
            
            {members.length > 0 && (
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                    slidesToScroll: 'auto',
                  }}
                  className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto"
                >
                  <CarouselContent className="-ml-4">
                    {members.map((member, index) => (
                      <CarouselItem key={index} className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 flex justify-center">
                          <SmallMemberCard 
                            member={member} 
                            onSelect={() => handleSelectMember(member)}
                            isActive={featuredMember?.name === member.name}
                          />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className={cn("flex z-20", !showNavOnDesktop && "md:hidden")} />
                  <CarouselNext className={cn("flex z-20", !showNavOnDesktop && "md:hidden")} />
                </Carousel>
            )}
            <div className="w-full pt-8 mt-8 border-t border-primary/20"></div>
        </div>
    );
};


export default function ProfilePage() {
  const [activeDept, setActiveDept] = useState(departments[0]);
  const [activeView, setActiveView] = useState('members');
  const [featuredHead, setFeaturedHead] = useState<Member | null>(null);
  const [featuredMembers, setFeaturedMembers] = useState<{[key: string]: Member | null}>({});
  
  const currentDepartmentData = teamMembers[activeDept.id as keyof typeof teamMembers] || { heads: [], members: {} };
  const currentPrograms = programs[activeDept.id as keyof typeof programs] || [];
  const currentDivisions = divisions[activeDept.id as keyof typeof divisions] || [];
  
  useEffect(() => {
    const newHeads = teamMembers[activeDept.id as keyof typeof teamMembers]?.heads || [];
    setFeaturedHead(newHeads.length > 0 ? newHeads[0] : null);

    const newMembersByDivision = teamMembers[activeDept.id as keyof typeof teamMembers]?.members || {};
    const initialFeaturedMembers: {[key: string]: Member | null} = {};
    for (const divisionId in newMembersByDivision) {
        const divisionMembers = newMembersByDivision[divisionId as keyof typeof newMembersByDivision] || [];
        initialFeaturedMembers[divisionId] = divisionMembers.length > 0 ? divisionMembers[0] : null;
    }
    setFeaturedMembers(initialFeaturedMembers);
  }, [activeDept]);

  const setFeaturedMemberForDivision = (divisionId: string, member: Member | null) => {
    setFeaturedMembers(prev => ({...prev, [divisionId]: member}));
  }

  return (
    <div className="flex flex-col bg-pink-50/30">
       <section
        id="hero-profile"
        className="relative w-full bg-background flex items-center justify-center min-h-screen overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
            <div className="absolute w-72 h-72 bg-pink-100/50 rounded-full -top-10 -left-20 blur-2xl"></div>
            <div className="absolute w-72 h-72 bg-blue-100/50 rounded-full -bottom-10 -right-20 blur-2xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 min-h-screen">
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

                 <div className="relative flex items-center justify-center h-[500px] md:h-auto md:aspect-square">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
                        <Image src="https://placehold.co/300x300.png" width={300} height={300} alt="Team Main" className="rounded-full object-cover shadow-2xl border-8 border-white z-10" data-ai-hint="team leader" />
                    </div>
                    
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40">
                         <Image src="https://placehold.co/200x200.png" width={200} height={200} alt="Team 1" className="rounded-full object-cover shadow-lg border-4 border-white" data-ai-hint="student group"/>
                    </div>
                    
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40">
                          <Image src="https://placehold.co/200x200.png" width={200} height={200} alt="Team 2" className="rounded-full object-cover shadow-lg border-4 border-white" data-ai-hint="university event"/>
                    </div>

                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-28 h-28 md:w-36 md:h-36">
                        <Image src="https://placehold.co/150x150.png" width={150} height={150} alt="Team 3" className="rounded-full object-cover shadow-lg border-4 border-white" data-ai-hint="students studying"/>
                    </div>

                     <div className="absolute top-1/2 -translate-y-1/2 right-0 w-28 h-28 md:w-36 md:h-36">
                          <Image src="https://placehold.co/150x150.png" width={150} height={150} alt="Team 4" className="rounded-full object-cover shadow-lg border-4 border-white" data-ai-hint="students collaborating"/>
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
                           activeDept.id === dept.id ? 'bg-white/20 [&>svg]:text-white' : 'bg-pink-100'
                        )}>
                           {React.cloneElement(dept.icon, {className: cn("w-8 h-8", activeDept.id === dept.id ? 'text-white' : 'text-primary')})}
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
            <div className="relative w-24 h-24 mb-4 bg-pink-100 text-primary rounded-full flex items-center justify-center">
              {React.cloneElement(activeDept.icon, {className: "w-12 h-12 text-primary"})}
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
             <div className="space-y-12">
                <MemberGroup 
                    title={activeDept.id === 'inti' ? 'Badan Pengurus Harian' : 'Kepala Departemen & Koordinator'}
                    members={currentDepartmentData.heads}
                    featuredMember={featuredHead}
                    setFeaturedMember={setFeaturedHead}
                />
                {Object.keys(currentDepartmentData.members).length > 0 && currentDivisions.length > 0 && (
                  currentDivisions.map(division => {
                    const divisionMembers = currentDepartmentData.members[division.id as keyof typeof currentDepartmentData.members] || [];
                    if (divisionMembers.length === 0) return null;
                    return (
                        <MemberGroup 
                            key={division.id}
                            title={`Anggota Divisi ${division.name}`}
                            members={divisionMembers}
                            featuredMember={featuredMembers[division.id] || null}
                            setFeaturedMember={(member) => setFeaturedMemberForDivision(division.id, member)}
                            showNavOnDesktop={true}
                        />
                    );
                  })
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
