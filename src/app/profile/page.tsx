
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, Award, Instagram, ArrowUpRight, GraduationCap, Megaphone, Sparkles, HeartHandshake, Store, ChevronDown } from 'lucide-react';
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
  { id: 'inti', name: 'BPH', fullName: 'Badan Pengurus Harian', icon: <Award className="w-8 h-8" />, description: 'Bertanggung jawab atas koordinasi umum dan arah strategis organisasi.' },
  { id: 'ptkp', name: 'PTKP', fullName: 'Perguruan Tinggi dan Kepemudaan', icon: <GraduationCap className="w-8 h-8" />, description: 'Departemen Perguruan Tinggi dan Kepemudaan (PTKP), yaitu keanggotaan yang mempunyai tugas dalam mengelola Akademik dan kepemudaan di lingkungan Manajemen Informatika Politeknik Negeri Sriwijaya yang diangkat oleh Badan Pengurus Harian.' },
  { id: 'humas', name: 'Humas', fullName: 'Hubungan Mahasiswa', icon: <Megaphone className="w-8 h-8" />, description: 'Departemen Hubungan Mahasiswa (HUMAS), yaitu keanggotaan biasa yang bertugas dalam bersosialisasi di lingkungan Politeknik Negeri Sriwijaya dan mengelola akun media sosial HMJ MI serta menjadi wadah informasi bagi Jurusan Manajemen Informatika baik informasi dari dalam maupun dari luar jurusan yang diangkat oleh Badan Pengurus Harian.' },
  { id: 'psdm', name: 'PSDM', fullName: 'Pengembangan Sumber Daya Mahasiswa', icon: <Sparkles className="w-8 h-8" />, description: 'Departemen Pengembangan Sumber Daya Manusia (PSDM), yaitu keanggotaan biasa yang mempunyai tugas dalam mengelola, menyalurkan minat dan bakat di bidang non-akademik serta mengawasi anggota kepengurusan HMJ MI menjadi lebih baik di lingkungan Manajemen Informatika yang diangkat oleh Badan Pengurus Harian.' },
  { id: 'kesma', name: 'Kesma', fullName: 'Kesejahteraan Mahasiswa', icon: <HeartHandshake className="w-8 h-8" />, description: 'Departemen Kesejahteraan Mahasiswa (KESMA), yaitu keanggotaan biasa yang bertugas dalam mensejahterakan mahasiswa dan membangun sisi religius serta jiwa sosial di lingkungan Manajemen Informatika yang diangkat oleh Badan Pengurus Harian.' },
  { id: 'bistra', name: 'Bistra', fullName: 'Bisnis dan Kemitraan', icon: <Store className="w-8 h-8" />, description: 'Departemen Bisnis dan Kemitraan (BISTRA), yaitu keanggotaan biasa yang bertugas dalam mengelola usaha dari mahasiswa dan mengkoordinir kesekretariatan serta melaksanakan pembinaan terkait bisnis di jurusan Manajemen Informatika yang diangkat oleh Badan Pengurus Harian.' },
];

const teamMembers = {
  inti: {
    heads: [
      { name: 'Muhammad Farhan Pratama', role: 'Ketua Himpunan', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      { name: 'Muhammad Dava Prayoga', role: 'Wakil Ketua Himpunan', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      { name: 'Siti Nabila Zhafirah', role: 'Sekretaris Umum', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      { name: 'Eka Rahayu Putri', role: 'Wakil Sekretaris Umum', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      { name: 'Muthia Maylafayza Inayah', role: 'Bendahara Umum', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      { name: 'Putri Afifah Khairunnisa', role: 'Wakil Bendahara Umum', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
    ],
    members: {}
  },
  ptkp: {
    heads: [
        { name: 'Al Fajri Nur Ramadhan', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Agnes', role: 'Wakil Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Shofi Nanda Rismaliani', role: 'Sekretaris', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Lara Amelia Apriani', role: 'Bendahara', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Lenno Nardo', role: 'Koordinator Akademik', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Ichwan', role: 'Koordinator Kepemudaan', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
    ],
    members: {
      akademik: [
        { name: 'Devi Aprianti', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'M. Irfan Apriansyah', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Kemas Muhammad Amar Fauzan', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'M. Bahrudin', role: 'Anggota', class: 'MI 2023', avatar: '/M Bahrudin.png', instagram: "-" },
        { name: 'Dimas Yuda Pratama', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Niken Septi Andini', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Delvia Apriani', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
      kepemudaan: [
        { name: 'Miftahul Jannah', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Nis Murib', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Briliana Azizah', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Fadlil', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Innayah Dwikhailah Putri', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Irham Bagus Sanjaya', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Satria Anugrah', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Rasya Ratu Juanna', role: 'Anggota', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ]
    }
  },
  humas: {
     heads: [
        { name: 'Masya Dinar Fadillah', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhamad Rifky Septiansyah', role: 'Wakil Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Panisah', role: 'Sekretaris', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Ajeng Alieffiyah Safitri', role: 'Bendahara', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Zakira Surani', role: 'Koordinator Kominfo', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Vanessa Septia Putri', role: 'Koordinator Medkraf', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Nailah Zhafirah Cahyalia Jaya', role: 'Koordinator Jurnalis', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
     ],
    members: {
      kominfo: [
          { name: 'Arien Salsabila Basurini', role: 'Anggota Kominfo', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Nadi Kurniawan', role: 'Anggota Kominfo', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Fajar Setyanusa', role: 'Anggota kominfo', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Nafi Julian Syam Fajri', role: 'Anggota Kominfo', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Diana Mareta', role: 'Anggota Kominfo', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Anggun Ayu Tria Rahmah', role: 'Anggota Kominfo', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
      medkraf: [
          { name: 'M. Dandi Firjatullah', role: 'Anggota Medkraf', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Muhammad Nabil Fadhilah', role: 'Anggota Medkraf', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Finolia Rama Danti', role: 'Anggota Medkraf', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Nuril Maghfiroh', role: 'Anggota Medkraf', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Helza Framesha', role: 'Anggota Medkraf', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Thomas Kristalio Ariflan Santos', role: 'Anggota Medkraf', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
      jurnalis: [
          { name: 'Regas Sonjaya', role: 'Anggota Jurnalis', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Sulthan Muhammad Diftha Annashira', role: 'Anggota Jurnalis', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Arau Imanuel Siritoitet', role: 'Anggota Jurnalis', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Muhammad Kevin Fadhilah Akmal', role: 'Anggota Jurnalis', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
    }
  },
  psdm: {
      heads: [
        { name: 'Muhammad Naufal Athallah', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Aulia Niputri', role: 'Wakil Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Sri Rahayu Rezeki', role: 'Sekretaris', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Shoofiyah Maharani', role: 'Bendahara', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Handika Putra', role: 'Koordinator Minat Bakat', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Nama Anggota HRD', role: 'Koordinator Bidang HRD PSDM', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
    members: {
      minatbakat: [
          { name: 'Swarnata Prayoga', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Nurhaliza', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Nanda Meylani Putri', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Luluk Anggraini', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Ridho Dwi Restiandi', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Muhammad Haekal Saleh', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Muhammad Fathir Romeo', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Shafia Aurajannah Marza', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Renjiro Alief Daniswara', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Fika Dwi Jayanti', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Nurin Nabya', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Kayla Syakirah', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'M. Faizal Alfriandy', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Muhammad Ridho Pratama', role: 'Anggota Minat Bakat', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
       hrd: []
    }
  },
  kesma: {
      heads: [
        { name: 'Muhamad Rizqon Yasir', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Zalsabila Herawaty', role: 'Wakil Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Aisyah Arianti', role: 'Sekretaris', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Azzahra Dinda Febrianti', role: 'Bendahara', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Sutan Artha', role: 'Koordinator Agama', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Adhyaksa Micko Satria', role: 'Koordinator Sosial', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
    members: {
      agama: [
        { name: 'Annisa Nurhidayah', role: 'Anggota Agama', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Ghani Yusha', role: 'Anggota Agama', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Rizky Pratama', role: 'Anggota Agama', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Nabila Huwaida', role: 'Anggota Agama', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Rizky Wijaya', role: 'Anggota Agama', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
      sosial: [
        { name: 'Dimas Fajar Satrio', role: 'Anggota Sosial', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Jessica Imelda Septriani', role: 'Anggota Sosial', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Rifki Surya Pratama', role: 'Anggota Sosial', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Tarisha Bais Husna', role: 'Anggota Sosial', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Adinda Rahmalia', role: 'Anggota Sosial', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Amira Luthfia Alkamila', role: 'Anggota Sosial', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Frans Ahmad Zharif', role: 'Anggota Sosial', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Rasya Syakir', role: 'Anggota Sosial', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
    }
  },
  bistra: {
      heads: [
        { name: 'Mochamad Raechan Albani', role: 'Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Rahmi Fauliza Hanapsari', role: 'Wakil Kepala Departemen', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Adellia Nurain', role: 'Sekretaris', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Liana Melisa', role: 'Bendahara', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Dani Maulana', role: 'Koordinator Bisnis', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Natasya Bella Shavira', role: 'Koordinator Kemitraan', class: 'MI 2022', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
    members: {
      bisnis: [
        { name: 'Henny Daraditha Salsabilla', role: 'Anggota Bisnis', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Tri Aji Alhuda', role: 'Anggota Bisnis', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Munzillin Zahri Aji', role: 'Anggota Bisnis', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Azrin', role: 'Anggota Bisnis', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Alfaris Abiyyu Ramadhan', role: 'Anggota Bisnis', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Fadhlan Lordiansyah', role: 'Anggota Bisnis', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
      kemitraan: [
        { name: 'Aldi Kurniawan', role: 'Anggota Kemitraan', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Sharla Imanda', role: 'Anggota Kemitraan', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Afifah Saharani', role: 'Anggota Kemitraan', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Fenita Harlina', role: 'Anggota Kemitraan', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Ayu Sari Romadhon', role: 'Anggota Kemitraan', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Nabila Salsabila', role: 'Anggota Kemitraan', class: 'MI 2023', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
    }
  }
};


const programs = {
    inti: [
        { title: 'IT Festival', category: 'KOMPETISI & EDUKASI', description: 'Acara IT tahunan yang mencakup kompetisi, pelatihan, dan seminar untuk mahasiswa dan masyarakat umum.', image: 'https://placehold.co/400x200.png', hint: 'tech festival stage competition' },
        { title: 'Sertijab & Demisioner', category: 'INTERNAL', description: 'Momen serah terima jabatan dari kepengurusan lama ke kepengurusan baru.', image: 'https://placehold.co/400x200.png', hint: 'organization meeting' }
    ],
    ptkp: [
        { title: 'SINTAK', category: 'PENGEMBANGAN DIRI', description: 'Study club untuk mengembangkan soft skill dalam pemrograman, terutama di bidang web development.', image: 'https://placehold.co/400x200.png', hint: 'coding workshop' },
    ],
    humas: [
        { title: 'VIBE (Voice of Informatics and Business Event)', category: 'EDUKASI', description: 'Acara yang menggabungkan seminar dan talk show inspiratif di bidang informatika dan bisnis.', image: 'https://placehold.co/400x200.png', hint: 'seminar event' },
        { title: 'UPGRADING', category: 'PELATIHAN', description: 'Pelatihan yang dikhususkan untuk kepengurusan baru demi meningkatkan kemampuan public speaking dan desain grafis.', image: 'https://placehold.co/400x200.png', hint: 'skill workshop' },
    ],
    psdm: [
        { title: 'Latihan Dasar Organisasi', category: 'PELATIHAN', description: 'Program pelatihan dasar bagi calon anggota untuk membekali mereka dengan pengetahuan fundamental tentang organisasi.', image: 'https://placehold.co/400x200.png', hint: 'leadership training' },
        { title: 'POSMI', category: 'MINAT BAKAT', description: 'Kompetisi olahraga dan seni untuk mahasiswa Jurusan Manajemen Informatika.', image: 'https://placehold.co/400x200.png', hint: 'student competition' }
    ],
    kesma: [
        { title: 'BAKSOMI', category: 'SOSIAL', description: 'Bakti sosial yang mencakup kunjungan ke panti, tausiyah, serta bagi-bagi takjil.', image: 'https://placehold.co/400x200.png', hint: 'social charity' },
    ],
    bistra: [
        { title: 'Seminar Bisnis', category: 'EDUKASI', description: 'Menambah wawasan mengenai bisnis dan berwirausaha serta memotivasi mahasiswa untuk memulai usaha sejak dini.', image: 'https://placehold.co/400x200.png', hint: 'business seminar' }
    ]
};

const divisions = {
  ptkp: [
    { id: 'akademik', name: 'Divisi Akademik', description: 'Mengkoordinir sumber daya mahasiswa dibidang akademik guna mewujudkan mahasiswa yang cerdas dan aktif' },
    { id: 'kepemudaan', name: 'Divisi Kepemudaan', description: 'bertugas memantau isu-isu yang berkembang dan mewakili mahasiswa dalam menyampaikan permasalahan tersebut di lingkungan jurusan Manajemen Informatika.' },
  ],
  humas: [
    { id: 'medkraf', name: 'Media Kreatif', description: 'Media Kreatif (Medkraf) berperan sebagai pusat pengembangan konten visual dan narasi digital. Tanggung jawab utamanya meliputi eksekusi ide kreatif dalam bentuk desain grafis, videografi, fotografi, serta copywriting. Selain itu, divisi ini bertugas mengelola seluruh platform media sosial dan menjadi garda terdepan dalam menyebarluaskan informasi secara inovatif, khususnya untuk lingkungan Jurusan Manajemen Informatika.' },
    { id: 'kominfo', name: 'Komunikasi dan Informasi', description: 'Komunikasi dan Informasi (Kominfo) bertanggung jawab untuk menjadi perwakilan bagi Himpunan Mahasiswa Jurusan Manajemen Informatika dan menjadi wadah informasi yang dibutuhkan oleh seluruh mahasiswa baik dari dalam maupun dari luar Jurusan Manajemen Informatika.' },
    { id: 'jurnalis', name: 'Jurnalistik', description: 'Divisi Jurnalistik adalah pilar utama dalam penyediaan informasi yang akurat dan terpercaya. Divisi ini bertanggung jawab penuh atas seluruh proses jurnalistik, mulai dari peliputan acara, melakukan wawancara, hingga riset mendalam. Semua informasi yang terkumpul diolah dan disajikan secara objektif dalam bentuk berita, artikel feature, maupun tulisan inspiratif. Tujuannya adalah untuk memastikan seluruh lingkungan Jurusan Manajemen Informatika mendapatkan informasi yang kredibel dan beretika.' },
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
            <div className="relative mx-auto w-full max-w-xs h-[380px] flex items-center justify-center">
                 <div className="absolute w-[280px] h-full rounded-t-[140px] rounded-b-[6rem] bg-pink-100/80 dark:bg-primary/20"></div>
                 <div className="absolute w-[280px] h-full rounded-t-[140px] rounded-b-[6rem] border-4 border-primary"></div>
                 <div className="relative w-[240px] h-[320px] rounded-t-[120px] rounded-b-[5rem] overflow-hidden">
                    <Image src={member.avatar} alt={member.name} layout="fill" className="object-cover object-top" data-ai-hint="headshot portrait" />
                 </div>
            </div>
            <div className="flex flex-col gap-2 text-center md:text-left">
                <h3 className="text-3xl font-bold text-primary">{member.name}</h3>
                <p className="text-xl font-semibold text-foreground">{member.role}</p>
                <p className="text-muted-foreground">{member.class}</p>
                {member.instagram && (
                    <a 
                      href={member.instagram === '-' ? 'https://instagram.com' : `https://instagram.com/${member.instagram}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-muted-foreground hover:text-primary transition-colors justify-center md:justify-start"
                    >
                        <Instagram className="h-5 w-5" />
                        {member.instagram !== '-' && <span>{member.instagram}</span>}
                    </a>
                )}
            </div>
        </div>
    )
};

const SmallMemberCard = ({ member, onSelect, isActive }: { member: Member, onSelect: () => void, isActive: boolean }) => (
    <div 
      className="flex flex-col items-center gap-2 cursor-pointer group"
      onClick={onSelect}
    >
        <div 
            className={cn(
                "relative aspect-square w-24 md:w-32 rounded-full overflow-hidden transition-all duration-300 border-4",
                isActive ? "scale-110 border-primary z-10" : "border-primary/50 group-hover:scale-105 group-hover:border-primary/80"
            )}
        >
            <Image src={member.avatar} alt={member.name} layout="fill" className="object-cover object-top" data-ai-hint="headshot portrait" />
        </div>
        <p className="text-xs text-center font-semibold text-foreground/80 w-24 md:w-32 truncate">{member.name}</p>
    </div>
);


const MemberGroup = ({ title, members, featuredMember, setFeaturedMember, showNavOnDesktop = false }: { title: string, members: Member[], featuredMember: Member | null, setFeaturedMember: (member: Member | null) => void, showNavOnDesktop?: boolean }) => {
    if (!members || members.length === 0) return null;

    const handleSelectMember = (member: Member) => {
        setFeaturedMember(member);
    };

    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground text-center">{title}</h3>
            {featuredMember && (
                 <div className="flex justify-center">
                    <MemberCard member={featuredMember} />
                </div>
            )}
            
            {members.length > 1 && (
                <div className="bg-pink-100/50 dark:bg-primary/20 p-4 rounded-2xl">
                  <Carousel
                    opts={{
                      align: "center",
                      loop: members.length > 5,
                    }}
                    className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto"
                  >
                    <CarouselContent className="-ml-4">
                      {members.map((member, index) => (
                        <CarouselItem key={index} className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 flex justify-center py-4">
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
                </div>
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
  const detailsRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  
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

    if (isInitialMount.current) {
        isInitialMount.current = false;
    } else {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeDept]);

  const handleDeptClick = (dept: typeof departments[0]) => {
    setActiveDept(dept);
  };

  const setFeaturedMemberForDivision = (divisionId: string, member: Member | null) => {
    setFeaturedMembers(prev => ({...prev, [divisionId]: member}));
  }

  return (
    <div className="flex flex-col">
       <section
        id="hero-profile"
        className="relative w-full flex items-center justify-center min-h-screen overflow-hidden bg-transparent"
      >
        <div className="absolute inset-0 bg-[url('/dot-grid.svg')] bg-repeat bg-center opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="default" className="mb-4 bg-primary/10 text-primary">
              Temui Tim Kami
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Kenali <span className="text-primary">Visioner Kami</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Kenali tim yang penuh semangat dan dedikasi di balik HMJ MI. Bersama, kami mendorong perubahan dan inovasi untuk masa depan yang lebih baik.
          </p>
           <div className="mt-8">
            <a href="#explore-cabinet">
                <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 animate-bounce">
                <ChevronDown className="h-6 w-6" />
                </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="explore-cabinet" className="w-full py-16 md:py-24 bg-primary/35 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Jelajahi <span className="text-primary">Struktur Kami</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Temukan berbagai departemen di HMJ MI, masing-masing dengan fokus dan program unggulan untuk mendukung pengembangan potensi mahasiswa secara menyeluruh.
            </p>
          </div>

          <Card className="max-w-5xl mx-auto p-6 md:p-8">
            <CardContent className="p-0">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-primary text-xl font-bold">*</span>
                <h3 className="text-xl font-bold text-center text-foreground/80">Departemen</h3>
                <span className="text-primary text-xl font-bold">*</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {departments.map((dept) => (
                  <button key={dept.id} onClick={() => handleDeptClick(dept)}>
                    <Card className={cn(
                      'text-center p-4 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl hover:scale-105 h-full',
                      activeDept.id === dept.id ? 'bg-primary text-primary-foreground shadow-primary/40' : 'bg-card'
                    )}>
                      <CardContent className="p-0 flex flex-col items-center gap-2">
                        <div className={cn(
                          'p-3 rounded-full transition-colors',
                           activeDept.id === dept.id ? 'bg-white/20' : 'bg-pink-100 dark:bg-primary/10'
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

      <section id="department-details" ref={detailsRef} className="w-full pb-16 md:pb-24 pt-16 md:pt-24 bg-transparent scroll-mt-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center flex flex-col items-center mb-12">
            <div className="relative w-24 h-24 mb-4 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              {React.cloneElement(activeDept.icon, {className: "w-12 h-12 text-primary"})}
            </div>
            <h2 className="text-4xl font-bold text-primary mb-2">{activeDept.fullName}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">{activeDept.description}</p>
             <div className="flex justify-center mb-4">
              <div className="w-16 h-0.5 bg-primary/50 rounded-full"></div>
            </div>

            {activeDept.id !== 'inti' && currentDivisions.length > 0 && (
              <Accordion type="single" collapsible className="w-full max-w-2xl mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Divisi</h3>
                   {currentDivisions.map((division) => (
                      <AccordionItem key={division.id} value={division.id} className="bg-card/80 backdrop-blur-sm border-b-2 rounded-lg mb-2 px-4">
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
                  activeView === 'members' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white text-gray-700 dark:text-foreground dark:bg-card'
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
                    activeView === 'programs' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white text-gray-700 dark:text-foreground dark:bg-card'
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
                    title={activeDept.id === 'inti' ? 'Pengurus Inti' : 'Pimpinan Departemen'}
                    members={currentDepartmentData.heads}
                    featuredMember={featuredHead}
                    setFeaturedMember={setFeaturedHead}
                    showNavOnDesktop={false}
                />
                {Object.keys(currentDepartmentData.members).length > 0 && currentDivisions.length > 0 && (
                  currentDivisions.map(division => {
                    const divisionMembers = currentDepartmentData.members[division.id as keyof typeof currentDepartmentData.members] || [];
                    if (divisionMembers.length === 0) return null;
                    return (
                        <MemberGroup 
                            key={division.id}
                            title={`Tim Divisi ${division.name}`}
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
                 <h3 className="text-2xl font-bold text-foreground relative inline-block">
                    Program Unggulan
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-primary/50 rounded-full"></span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {currentPrograms.length > 0 ? (
                  currentPrograms.map((program, index) => (
                      <Card key={index}>
                          <CardContent className="p-0">
                               <div className="relative aspect-video">
                                  <Image src={program.image} layout="fill" objectFit="cover" alt={program.title} data-ai-hint={program.hint}/>
                                  <div className="absolute top-2 right-2">
                                       <Badge className="bg-yellow-300 text-yellow-900 font-bold">{program.category}</Badge>
                                  </div>
                              </div>
                              <div className="p-6">
                                  <h4 className="text-xl font-bold text-foreground mb-2">{program.title}</h4>
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
                  <p className="text-muted-foreground col-span-full text-center">Program kerja untuk departemen ini akan segera diperbarui.</p>
                )}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

    