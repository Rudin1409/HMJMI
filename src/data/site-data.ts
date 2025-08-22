
export const homeHeroImages = [
    {
        src: "https://placehold.co/600x300.png",
        alt: "Group photo 1",
        hint: "university student group",
        className: "row-span-1 relative rounded-2xl overflow-hidden"
    },
    {
        src: "https://placehold.co/600x300.png",
        alt: "Group photo 2",
        hint: "students coding event",
        className: "row-span-1 relative rounded-2xl overflow-hidden"
    },
];

export const aboutHeroImages = [
    { 
        src: "https://placehold.co/300x300.png", 
        width: 300, 
        height: 300, 
        alt: "Team Main", 
        hint: "team leader",
        className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-52 md:h-52 z-10"
    },
    { 
        src: "https://placehold.co/200x200.png", 
        width: 200, 
        height: 200, 
        alt: "Team 1", 
        hint: "student group",
        className: "absolute top-8 left-1/2 -translate-x-[80%] w-24 h-24 md:w-32 md:h-32"
    },
    { 
        src: "https://placehold.co/200x200.png", 
        width: 200, 
        height: 200, 
        alt: "Team 2", 
        hint: "university event",
        className: "absolute bottom-8 left-1/2 -translate-x-[20%] w-24 h-24 md:w-32 md:h-32"
    },
    { 
        src: "https://placehold.co/150x150.png", 
        width: 150, 
        height: 150, 
        alt: "Team 3", 
        hint: "students studying",
        className: "absolute top-1/2 -translate-y-[120%] left-10 w-20 h-20 md:w-28 md:h-28"
    },
    { 
        src: "https://placehold.co/150x150.png", 
        width: 150, 
        height: 150, 
        alt: "Team 4", 
        hint: "students collaborating",
        className: "absolute top-1/2 translate-y-[20%] right-10 w-20 h-20 md:w-28 md:h-28"
    }
];

export const galleryItems = [
    {
        src: "https://placehold.co/800x600.png",
        title: "LKMM-PD HMJ MI POLSRI",
        year: "2024",
        hint: "student presentation"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "LKMM-PD HMJ MI POLSRI",
        year: "2024",
        hint: "student audience"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "UPGRADING HMJ MI POLSRI",
        year: "2024",
        hint: "group photo"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "UPGRADING HMJ MI POLSRI",
        year: "2024",
        hint: "students sitting"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "MUSYAWARAH BESAR HMJ MI",
        year: "2024",
        hint: "large group"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "MUSYAWARAH BESAR HMJ MI",
        year: "2024",
        hint: "students listening"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "SEMINAR NASIONAL",
        year: "2024",
        hint: "student team"
    },
    {
        src: "https://placehold.co/800x600.png",
        title: "SEMINAR NASIONAL",
        year: "2024",
        hint: "student speaking"
    },
];

export type GalleryItem = typeof galleryItems[0];


export const testimonials = [
  {
    name: 'Alumni MI 2020',
    role: 'Ketua Himpunan 2019-2020',
    avatar: 'https://placehold.co/100x100.png',
    text: 'Menjadi Ketua HMJ MI adalah salah satu pengalaman paling berharga. Saya belajar tentang kepemimpinan, tanggung jawab, dan kerja sama tim yang nyata.',
  },
  {
    name: 'Alumni MI 2021',
    role: 'Sekretaris Umum 2020-2021',
    avatar: 'https://placehold.co/100x100.png',
    text: 'Bergabung dengan HMJ MI adalah keputusan terbaik. Saya tidak hanya mendapatkan relasi yang luas, tetapi juga pengalaman baru yang tak ternilai harganya.',
  },
  {
    name: 'Pengurus Aktif',
    role: 'Kepala Dept. Akademik',
    avatar: 'https://placehold.co/100x100.png',
    text: 'Di HMJ MI, saya merasakan bagaimana riset dan inovasi berpadu, menantang batas konvensional dan mengubah ide menjadi karya nyata.',
  },
  {
    name: 'Alumni MI 2019',
    role: 'Software Engineer',
    avatar: 'https://placehold.co/100x100.png',
    text: 'HMJ MI adalah tempat terbaik untuk tumbuh. Keterampilan yang saya pelajari di sini sangat relevan dan membantu saya di dunia kerja profesional.',
  },
  {
    name: 'Mahasiswa MI 2022',
    role: 'Anggota Aktif',
    avatar: 'https://placehold.co/100x100.png',
    text: 'Kegiatan dan program kerja di HMJ MI sangat membantu saya dalam mengembangkan soft skill dan mempersiapkan diri untuk karir masa depan di industri teknologi.',
  },
];
