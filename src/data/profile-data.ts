
export const departments = [
  { id: 'inti', name: 'BPH', fullName: 'Badan Pengurus Harian', icon: 'Award', description: 'Bertanggung jawab atas koordinasi umum dan arah strategis organisasi.' },
  { id: 'ptkp', name: 'PTKP', fullName: 'Perguruan Tinggi dan Kepemudaan', icon: 'GraduationCap', description: 'Departemen Perguruan Tinggi dan Kepemudaan (PTKP), yaitu keanggotaan yang mempunyai tugas dalam mengelola Akademik dan kepemudaan di lingkungan Manajemen Informatika Politeknik Negeri Sriwijaya yang diangkat oleh Badan Pengurus Harian.' },
  { id: 'humas', name: 'Humas', fullName: 'Hubungan Mahasiswa', icon: 'Megaphone', description: 'Departemen Hubungan Mahasiswa (HUMAS), yaitu keanggotaan biasa yang bertugas dalam bersosialisasi di lingkungan Politeknik Negeri Sriwijaya dan mengelola akun media sosial HMJ MI serta menjadi wadah informasi bagi Jurusan Manajemen Informatika baik informasi dari dalam maupun dari luar jurusan yang diangkat oleh Badan Pengurus Harian.' },
  { id: 'psdm', name: 'PSDM', fullName: 'Pengembangan Sumber Daya Mahasiswa', icon: 'Sparkles', description: 'Departemen Pengembangan Sumber Daya Manusia (PSDM), yaitu keanggotaan biasa yang mempunyai tugas dalam mengelola, menyalurkan minat dan bakat di bidang non-akademik serta mengawasi anggota kepengurusan HMJ MI menjadi lebih baik di lingkungan Manajemen Informatika yang diangkat oleh Badan Pengurus Harian.' },
  { id: 'kesma', name: 'Kesma', fullName: 'Kesejahteraan Mahasiswa', icon: 'HeartHandshake', description: 'Departemen Kesejahteraan Mahasiswa (KESMA), yaitu keanggotaan biasa yang bertugas dalam mensejahterakan mahasiswa dan membangun sisi religius serta jiwa sosial di lingkungan Manajemen Informatika yang diangkat oleh Badan Pengurus Harian.' },
  { id: 'bistra', name: 'Bistra', fullName: 'Bisnis dan Kemitraan', icon: 'Store', description: 'Departemen Bisnis dan Kemitraan (BISTRA), yaitu keanggotaan biasa yang bertugas dalam mengelola usaha dari mahasiswa dan mengkoordinir kesekretariatan serta melaksanakan pembinaan terkait bisnis di jurusan Manajemen Informatika yang diangkat oleh Badan Pengurus Harian.' },
];

export const teamMembers = {
  inti: {
    heads: [
      { name: 'Muhammad Farhan Pratama', role: 'Ketua Himpunan', class: 'MI 2024', avatar: '/anggota/M. FARHAN PRATAMA.png', instagram: "-" },
      { name: 'Muhammad Dava Prayoga', role: 'Wakil Ketua Himpunan', class: 'MI 2024', avatar: '/anggota/M.DAVA PRAYOGA.png', instagram: "-" },
      { name: 'Siti Nabila Zhafirah', role: 'Sekretaris Umum', class: 'MI 2024', avatar: '/anggota/SITI NABILA ZHAFIRAH.png', instagram: "-" },
      { name: 'Eka Rahayu Putri', role: 'Wakil Sekretaris Umum', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      { name: 'Muthia Maylafayza Inayah', role: 'Bendahara Umum', class: 'MI 2024', avatar: '/anggota/MUTIA MAYLAFAYZA INAYAH.png', instagram: "-" },
      { name: 'Putri Afifah Khairunnisa', role: 'Wakil Bendahara Umum', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
    ],
    members: {}
  },
  ptkp: {
    heads: [
        { name: 'Al Fajri Nur Ramadhan', role: 'Kepala Departemen', class: 'MI 2024', avatar: '/anggota/ptkp24/AL FAJRI NUR RAMADHAN.png', instagram: "-" },
        { name: 'Agnes', role: 'Wakil Kepala Departemen', class: 'MI 2024', avatar: '/anggota/ptkp24/agnes.png', instagram: "-" },
        { name: 'Shofi Nanda Rismaliani', role: 'Sekretaris', class: 'MI 2024', avatar: '/anggota/ptkp24/SHOFI NANDA R.png', instagram: "-" },
        { name: 'Lara Amelia Apriani', role: 'Bendahara', class: 'MI 2024', avatar: '/anggota/ptkp24/lara.png', instagram: "-" },
        { name: 'Lenno Nardo', role: 'Koordinator Akademik', class: 'MI 2024', avatar: '/anggota/ptkp24/leno.png', instagram: "-" },
        { name: 'Muhammad Ichwan', role: 'Koordinator Kepemudaan', class: 'MI 2024', avatar: '/anggota/ptkp24/M.ICWHAN.png', instagram: "-" },
    ],
    members: {
      akademik: [
        { name: 'Devi Aprianti', role: 'Anggota', class: 'MI 2024', avatar: '/anggota/ptkp24/devi.png', instagram: "-" },
        { name: 'M. Irfan Apriansyah', role: 'Anggota', class: 'MI 2024', avatar: '/anggota/ptkp24/M.IRFAN APRIANSYAH.png', instagram: "-" },
        { name: 'Kemas Muhammad Amar Fauzan', role: 'Anggota', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'M. Bahrudin', role: 'Anggota', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Dimas Yuda Pratama', role: 'Anggota', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Niken Septi Andini', role: 'Anggota', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Delvia Apriani', role: 'Anggota', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
      kepemudaan: [
        { name: 'Miftahul Jannah', role: 'Anggota', class: 'MI 2024', avatar: '/anggota/ptkp24/MIFTAHUL JANNAH-.png', instagram: "-" },
        { name: 'Nis Murib', role: 'Anggota', class: 'MI 2024', avatar: '/anggota/ptkp24/nismurib.png', instagram: "-" },
        { name: 'Briliana Azizah', role: 'Anggota', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Fadlil', role: 'Anggota', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Innayah Dwikhailah Putri', role: 'Anggota', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Irham Bagus Sanjaya', role: 'Anggota', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Satria Anugrah', role: 'Anggota', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Rasya Ratu Juanna', role: 'Anggota', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ]
    }
  },
  humas: {
     heads: [
        { name: 'Masya Dinar Fadillah', role: 'Kepala Departemen', class: 'MI 2024', avatar: '/anggota/humas24/MASYA DINAR.png', instagram: "-" },
        { name: 'Muhamad Rifky Septiansyah', role: 'Wakil Kepala Departemen', class: 'MI 2024', avatar: '/anggota/humas24/M. RIFKI SEPTIANSYAH.png', instagram: "-" },
        { name: 'Panisah', role: 'Sekretaris', class: 'MI 2024', avatar: '/anggota/humas24/panisa.png', instagram: "-" },
        { name: 'Ajeng Alieffiyah Safitri', role: 'Bendahara', class: 'MI 2024', avatar: '/anggota/humas24/AJENG.png', instagram: "-" },
        { name: 'Zakira Surani', role: 'Koordinator Kominfo', class: 'MI 2024', avatar: '/anggota/humas24/ZAKIRA.png', instagram: "-" },
        { name: 'Vanessa Septia Putri', role: 'Koordinator Medkraf', class: 'MI 2024', avatar: '/anggota/humas24/VANESSA.png', instagram: "-" },
        { name: 'Nailah Zhafirah Cahyalia Jaya', role: 'Koordinator Jurnalis', class: 'MI 2024', avatar: '/anggota/humas24/NAILAH.png', instagram: "-" },
     ],
    members: {
      kominfo: [
          { name: 'Arien Salsabila Basurini', role: 'Anggota Kominfo', class: 'MI 2024', avatar: '/anggota/humas24/ARIEN.png', instagram: "-" },
          { name: 'Nadi Kurniawan', role: 'Anggota Kominfo', class: 'MI 2024', avatar: '/anggota/humas24/NADI.png', instagram: "-" },
          { name: 'Fajar Setyanusa', role: 'Anggota kominfo', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Nafi Julian Syam Fajri', role: 'Anggota Kominfo', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Diana Mareta', role: 'Anggota Kominfo', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Anggun Ayu Tria Rahmah', role: 'Anggota Kominfo', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
      medkraf: [
          { name: 'M. Dandi Firjatullah', role: 'Anggota Medkraf', class: 'MI 2024', avatar: '/anggota/humas24/M.DANDI.png', instagram: "-" },
          { name: 'Muhammad Nabil Fadhilah', role: 'Anggota Medkraf', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Finolia Rama Danti', role: 'Anggota Medkraf', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Nuril Maghfiroh', role: 'Anggota Medkraf', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Helza Framesha', role: 'Anggota Medkraf', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Thomas Kristalio Ariflan Santos', role: 'Anggota Medkraf', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
      jurnalis: [
          { name: 'Regas Sonjaya', role: 'Anggota Jurnalis', class: 'MI 2024', avatar: '/anggota/humas24/REGAS.png', instagram: "-" },
          { name: 'Sulthan Muhammad Diftha Annashira', role: 'Anggota Jurnalis', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Arau Imanuel Siritoitet', role: 'Anggota Jurnalis', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Muhammad Kevin Fadhilah Akmal', role: 'Anggota Jurnalis', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
    }
  },
  psdm: {
      heads: [
        { name: 'Muhammad Naufal Athallah', role: 'Kepala Departemen', class: 'MI 2024', avatar: '/anggota/psdm24/M.NAUFAL.png', instagram: "-" },
        { name: 'Aulia Niputri', role: 'Wakil Kepala Departemen', class: 'MI 2024', avatar: '/anggota/psdm24/AULIA.png', instagram: "-" },
        { name: 'Sri Rahayu Rezeki', role: 'Sekretaris', class: 'MI 2024', avatar: '/anggota/psdm24/SRI RAHAYU.png', instagram: "-" },
        { name: 'Shoofiyah Maharani', role: 'Bendahara', class: 'MI 2024', avatar: '/anggota/psdm24/SHOOFIYAH.png', instagram: "-" },
        { name: 'Handika Putra', role: 'Koordinator Minat Bakat', class: 'MI 2024', avatar: '/anggota/psdm24/HANDIKA.png', instagram: "-" },
        { name: '????', role: 'Koordinator Bidang HRD PSDM', class: 'MI 2024', avatar: '/anggota/psdm24/anonym.png', instagram: "-" },
      ],
    members: {
      minatbakat: [
          { name: 'Swarnata Prayoga', role: 'Anggota Minat Bakat', class: 'MI 2024', avatar: '/anggota/psdm24/SWARNATA.png', instagram: "-" },
          { name: 'Nurhaliza', role: 'Anggota Minat Bakat', class: 'MI 2024', avatar: '/anggota/psdm24/HALIZA.png', instagram: "-" },
          { name: 'Nanda Meylani Putri', role: 'Anggota Minat Bakat', class: 'MI 2024', avatar: '/anggota/psdm24/NANDA MELYANI.png', instagram: "-" },
          { name: 'Luluk Anggraini', role: 'Anggota Minat Bakat', class: 'MI 2024', avatar: '/anggota/psdm24/LULUK.png', instagram: "-" },
          { name: 'Ridho Dwi Restiandi', role: 'Anggota Minat Bakat', class: 'MI 2024', avatar: '/anggota/psdm24/RIDHO DWI.png', instagram: "-" },
          { name: 'Muhammad Haekal Saleh', role: 'Anggota Minat Bakat', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Muhammad Fathir Romeo', role: 'Anggota Minat Bakat', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Shafia Aurajannah Marza', role: 'Anggota Minat Bakat', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Renjiro Alief Daniswara', role: 'Anggota Minat Bakat', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Fika Dwi Jayanti', role: 'Anggota Minat Bakat', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Nurin Nabya', role: 'Anggota Minat Bakat', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Kayla Syakirah', role: 'Anggota Minat Bakat', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'M. Faizal Alfriandy', role: 'Anggota Minat Bakat', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
          { name: 'Muhammad Ridho Pratama', role: 'Anggota Minat Bakat', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
       hrd: []
    }
  },
  kesma: {
      heads: [
        { name: 'Muhamad Rizqon Yasir', role: 'Kepala Departemen', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Zalsabila Herawaty', role: 'Wakil Kepala Departemen', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Aisyah Arianti', role: 'Sekretaris', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Azzahra Dinda Febrianti', role: 'Bendahara', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Sutan Artha', role: 'Koordinator Agama', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Adhyaksa Micko Satria', role: 'Koordinator Sosial', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
    members: {
      agama: [
        { name: 'Annisa Nurhidayah', role: 'Anggota Agama', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Ghani Yusha', role: 'Anggota Agama', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Rizky Pratama', role: 'Anggota Agama', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Nabila Huwaida', role: 'Anggota Agama', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Rizky Wijaya', role: 'Anggota Agama', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
      sosial: [
        { name: 'Dimas Fajar Satrio', role: 'Anggota Sosial', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Jessica Imelda Septriani', role: 'Anggota Sosial', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Rifki Surya Pratama', role: 'Anggota Sosial', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Tarisha Bais Husna', role: 'Anggota Sosial', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Adinda Rahmalia', role: 'Anggota Sosial', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Amira Luthfia Alkamila', role: 'Anggota Sosial', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Frans Ahmad Zharif', role: 'Anggota Sosial', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Rasya Syakir', role: 'Anggota Sosial', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
    }
  },
  bistra: {
      heads: [
        { name: 'Mochamad Raechan Albani', role: 'Kepala Departemen', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Rahmi Fauliza Hanapsari', role: 'Wakil Kepala Departemen', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Adellia Nurain', role: 'Sekretaris', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Liana Melisa', role: 'Bendahara', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Dani Maulana', role: 'Koordinator Bisnis', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Natasya Bella Shavira', role: 'Koordinator Kemitraan', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
    members: {
      bisnis: [
        { name: 'Henny Daraditha Salsabilla', role: 'Anggota Bisnis', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Tri Aji Alhuda', role: 'Anggota Bisnis', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Munzillin Zahri Aji', role: 'Anggota Bisnis', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Muhammad Azrin', role: 'Anggota Bisnis', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Alfaris Abiyyu Ramadhan', role: 'Anggota Bisnis', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Fadhlan Lordiansyah', role: 'Anggota Bisnis', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
      kemitraan: [
        { name: 'Aldi Kurniawan', role: 'Anggota Kemitraan', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Sharla Imanda', role: 'Anggota Kemitraan', class: 'MI 2024', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Afifah Saharani', role: 'Anggota Kemitraan', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Fenita Harlina', role: 'Anggota Kemitraan', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Ayu Sari Romadhon', role: 'Anggota Kemitraan', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
        { name: 'Nabila Salsabila', role: 'Anggota Kemitraan', class: 'MI 2025', avatar: 'https://placehold.co/400x400.png', instagram: "-" },
      ],
    }
  }
};

export const programs = {
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

export const divisions = {
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
