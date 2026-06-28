<?php

namespace Database\Seeders;

use App\Models\WorkProgram;
use Illuminate\Database\Seeder;

class WorkProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing programs
        WorkProgram::query()->delete();

        $programs = [
            // Program Unggulan - BPH (inti)
            [
                'title' => 'IT Festival',
                'category' => 'unggulan',
                'department_id' => 'inti',
                'description' => 'Information Technology Festival atau yang disingkat dengan IT Festival merupakan serangkaian acara IT tahunan. Dengan rangkaian acara kompetisi, pelatihan, dan seminar sebagai ajang edukatif bagi mahasiswa maupun masyarakat umum dalam meningkatkan kreativitas dan kesadaran tentang pentingnya penggunaan teknologi informasi di era globalisasi.',
                'image_url' => '/Galeri/IT-fest.webp',
                'images' => ['/Galeri/IT-fest.webp', '/Galeri/Sembis.webp'],
                'link' => 'https://it-fest-2025-pi.vercel.app/',
                'icon' => 'Rocket',
                'frequency' => 'Setiap Tahun',
                'type' => 'Offline',
                'benefits' => [
                    ['title' => 'Wadah Edukasi', 'description' => 'Menjadi wadah untuk memperdalam pemahaman teknologi bagi mahasiswa.'],
                    ['title' => 'Relasi Profesional', 'description' => 'Membangun koneksi dengan praktisi industri IT dan mahasiswa se-Indonesia.'],
                    ['title' => 'Kompetisi Bergengsi', 'description' => 'Menguji kemampuan coding dan desain melalui ajang turnamen tingkat nasional.']
                ],
                'highlights' => [
                    'Seminar Teknologi Bersama Pemateri Expert',
                    'Lomba UI/UX Design, Web Development & Competitive Programming',
                    'Awarding Night & Exhibition Proyek Mahasiswa'
                ],
                'order_index' => 1,
            ],
            // Pengembangan - BISTRA
            [
                'title' => 'Seminar Bisnis',
                'category' => 'pengembangan',
                'department_id' => 'bistra',
                'description' => 'Kegiatan Seminar Bisnis bertujuan menambah wawasan dan pengetahuan mengenai bisnis dan berwirausaha serta memotivasi mahasiswa/i se-Indonesia dan umum untuk memulai usaha sejak dini dan siap bersaing di dunia bisnis.',
                'image_url' => '/Galeri/Sembis.webp',
                'images' => ['/Galeri/Sembis.webp'],
                'link' => null,
                'icon' => 'Briefcase',
                'frequency' => 'Setiap Tahun',
                'type' => 'Offline',
                'benefits' => [
                    ['title' => 'Wawasan Bisnis', 'description' => 'Memahami strategi memulai bisnis digital dari nol.'],
                    ['title' => 'Mental Wirausaha', 'description' => 'Memupuk keberanian mahasiswa untuk mandiri secara finansial.']
                ],
                'highlights' => [
                    'Workshop Business Model Canvas (BMC)',
                    'Talkshow Bersama CEO & Owner Bisnis Lokal',
                    'Sharing Session Pengalaman Kegagalan & Kesuksesan Bisnis'
                ],
                'order_index' => 2,
            ],
            // Komunitas - HUMAS
            [
                'title' => 'UPGRADING',
                'category' => 'komunitas',
                'department_id' => 'humas',
                'description' => 'Pelatihan yang dikhususkan untuk kepengurusan baru Himpunan Mahasiswa Jurusan Manajemen Informatika demi meningkatkan kemampuan dalam bidang berbicara di depan umum serta menambah kemampuan di bidang desain grafis.',
                'image_url' => '/proker/upgrading.webp',
                'images' => ['/proker/upgrading.webp'],
                'link' => null,
                'icon' => 'Award',
                'frequency' => '1 Kali Per Periode',
                'type' => 'Offline',
                'benefits' => [
                    ['title' => 'Public Speaking', 'description' => 'Meningkatkan rasa percaya diri saat berbicara di depan publik.'],
                    ['title' => 'Keahlian Desain', 'description' => 'Membekali pengurus dengan kemampuan desain dasar untuk keperluan media sosial.']
                ],
                'highlights' => [
                    'Mastering Public Speaking & Master of Ceremony (MC)',
                    'Workshop Desain Grafis Canva & Figma Basic',
                    'Fun Games & Ice Breaking Session'
                ],
                'order_index' => 3,
            ],
            // Komunitas - KESMA
            [
                'title' => 'BAKSOMI',
                'category' => 'komunitas',
                'department_id' => 'kesma',
                'description' => 'Bakti sosial jurusan manajemen informatika yang didalamnya terdapat rangkaian kegiatan bermanfaat seperti bantuan sosial, kunjungan ke panti, tausiyah serta bagi-bagi takjil dijalan.',
                'image_url' => '/proker/baksomiii.webp',
                'images' => ['/proker/baksomiii.webp'],
                'link' => null,
                'icon' => 'Heart',
                'frequency' => 'Setiap Tahun',
                'type' => 'Offline',
                'benefits' => [
                    ['title' => 'Jiwa Sosial', 'description' => 'Meningkatkan empati mahasiswa terhadap masyarakat yang membutuhkan.'],
                    ['title' => 'Sisi Religius', 'description' => 'Membangun keimanan melalui tausiyah bersama.']
                ],
                'highlights' => [
                    'Kunjungan & Donasi Sembako ke Panti Asuhan',
                    'Tausiyah Bersama Ustadz Tamu',
                    'Pembagian Takjil Gratis di Jalan Protokol'
                ],
                'order_index' => 4,
            ],
            // Komunitas - PTKP
            [
                'title' => 'SINTAK',
                'category' => 'komunitas',
                'department_id' => 'ptkp',
                'description' => 'Sebuah study club yang dibentuk sebagai wadah mahasiswa/i Jurusan Manajemen Informatika untuk mengembangkan soft skill dalam pemrograman terutama di bidang web development.',
                'image_url' => '/proker/sintak.webp',
                'images' => ['/proker/sintak.webp'],
                'link' => null,
                'icon' => 'Lightbulb',
                'frequency' => 'Setiap Minggu',
                'type' => 'Offline',
                'benefits' => [
                    ['title' => 'Soft Skill Coding', 'description' => 'Membantu mahasiswa menguasai coding web secara bertahap.'],
                    ['title' => 'Peer Learning', 'description' => 'Membentuk kelompok belajar yang kolaboratif dan saling mendukung.']
                ],
                'highlights' => [
                    'Belajar HTML, CSS, JavaScript dasar',
                    'Pengenalan framework Laravel & Tailwind CSS',
                    'Pembuatan mini portofolio website'
                ],
                'order_index' => 5,
            ],
            // Komunitas - PSDM
            [
                'title' => 'POSMI',
                'category' => 'komunitas',
                'department_id' => 'psdm',
                'description' => 'Acara kompetisi yang menyatukan peserta dari berbagai tim, kelas, dan program studi untuk berkompetisi dalam beragam cabang olahraga dan seni khusus untuk mahasiswa/i Jurusan Manajemen Informatika.',
                'image_url' => '/proker/posmi2024.webp',
                'images' => ['/proker/posmi2024.webp'],
                'link' => null,
                'icon' => 'Users',
                'frequency' => 'Setiap Tahun',
                'type' => 'Offline',
                'benefits' => [
                    ['title' => 'Kekeluargaan', 'description' => 'Mempererat kebersamaan dan silaturahmi antar angkatan.'],
                    ['title' => 'Penyaluran Bakat', 'description' => 'Sebagai wadah kompetisi olahraga & seni mahasiswa.']
                ],
                'highlights' => [
                    'Turnamen Futsal, Badminton & E-Sport (Mobile Legends)',
                    'Lomba Akustik & Vokal Solo',
                    'Defile Supporter & Closing Ceremony'
                ],
                'order_index' => 6,
            ],
            // Agenda Rutin - PSDM
            [
                'title' => 'Latihan Dasar Organisasi',
                'category' => 'agenda',
                'department_id' => 'psdm',
                'description' => 'Program pelatihan dasar bagi calon anggota untuk membekali mereka dengan pengetahuan fundamental tentang organisasi, kepemimpinan, dan manajemen.',
                'image_url' => null,
                'images' => [],
                'link' => null,
                'icon' => 'Briefcase',
                'frequency' => '1 Kali Per Periode',
                'type' => 'Offline',
                'benefits' => [
                    ['title' => 'Leadership', 'description' => 'Memahami teori kepemimpinan dan manajemen konflik.'],
                    ['title' => 'Manajemen Event', 'description' => 'Mempelajari cara menyusun proposal dan mengelola kepanitiaan.']
                ],
                'highlights' => [
                    'Pemberian Materi Keorganisasian & Konstitusi',
                    'Simulasi Sidang & Pembuatan Dokumen Organisasi',
                    'Outbound & Team Building Games'
                ],
                'order_index' => 7,
            ],
            // Agenda Rutin - BPH (inti)
            [
                'title' => 'Sertijab & Demisioner',
                'category' => 'agenda',
                'department_id' => 'inti',
                'description' => 'Momen serah terima jabatan dari kepengurusan lama ke kepengurusan baru, menandai awal dan akhir sebuah siklus kepemimpinan di Himpunan Mahasiswa Jurusan Manajemen Informatika.',
                'image_url' => null,
                'images' => [],
                'link' => null,
                'icon' => 'Briefcase',
                'frequency' => 'Setiap Tahun',
                'type' => 'Offline',
                'benefits' => [
                    ['title' => 'Transisi Kepemimpinan', 'description' => 'Menjamin kelangsungan roda organisasi dengan serah terima tanggung jawab yang jelas.'],
                    ['title' => 'Apresiasi Pengurus', 'description' => 'Pemberian penghargaan atas dedikasi dan kerja keras pengurus demisioner.']
                ],
                'highlights' => [
                    'Pembacaan Laporan Pertanggungjawaban (LPJ)',
                    'Prosesi Sumpah Jabatan Pengurus Baru',
                    'Pemberian Plakat Penghargaan Demisioner'
                ],
                'order_index' => 8,
            ],
            [
                'title' => 'Open Recruitment & Gathering HMJ MI',
                'category' => 'agenda',
                'department_id' => 'inti',
                'description' => 'Proses rekrutmen terbuka untuk menjaring anggota baru yang potensial, dilanjutkan dengan acara gathering untuk menyambut dan mengakrabkan seluruh anggota di keluarga besar HMJ MI.',
                'image_url' => null,
                'images' => [],
                'link' => null,
                'icon' => 'Briefcase',
                'frequency' => '1 Kali Per Periode',
                'type' => 'Offline',
                'benefits' => [
                    ['title' => 'Kaderisasi Unggul', 'description' => 'Menjaring talenta baru yang siap berkontribusi aktif bagi kemajuan jurusan.'],
                    ['title' => 'Solidaritas & Keakraban', 'description' => 'Membangun rasa kekeluargaan sejak awal bagi anggota baru.']
                ],
                'highlights' => [
                    'Wawancara & Seleksi Bakat Calon Anggota',
                    'Gathering & Welcoming Session',
                    'Team Bonding & Sharing Pengalaman'
                ],
                'order_index' => 9,
            ],
            [
                'title' => 'SIGMA',
                'category' => 'agenda',
                'department_id' => 'inti',
                'description' => 'Acara penyambutan khusus untuk mahasiswa baru Jurusan Manajemen Informatika, bertujuan untuk memperkenalkan lingkungan jurusan dan organisasi.',
                'image_url' => null,
                'images' => [],
                'link' => null,
                'icon' => 'Briefcase',
                'frequency' => 'Setiap Tahun',
                'type' => 'Offline',
                'benefits' => [
                    ['title' => 'Orientasi Jurusan', 'description' => 'Membantu mahasiswa baru mengenal lingkungan akademik Manajemen Informatika.'],
                    ['title' => 'Adaptasi Kampus', 'description' => 'Mempercepat proses adaptasi mahasiswa baru dengan kultur perkuliahan.']
                ],
                'highlights' => [
                    'Talkshow Pengenalan Kurikulum & Dosen',
                    'Tour Fasilitas & Laboratorium MI',
                    'Games & Welcoming Event Mahasiswa Baru'
                ],
                'order_index' => 10,
            ],
            [
                'title' => 'Malam Keakraban HMJ MI',
                'category' => 'agenda',
                'department_id' => 'inti',
                'description' => 'Acara tahunan yang dirancang untuk mempererat tali persaudaraan dan kebersamaan antar seluruh anggota HMJ MI melalui kegiatan yang santai dan menyenangkan.',
                'image_url' => null,
                'images' => [],
                'link' => null,
                'icon' => 'Briefcase',
                'frequency' => 'Setiap Tahun',
                'type' => 'Offline',
                'benefits' => [
                    ['title' => 'Hubungan Internal', 'description' => 'Mempererat ikatan emosional dan persaudaraan antar pengurus HMJ MI.'],
                    ['title' => 'Relaksasi & Fun', 'description' => 'Menyegarkan kembali semangat pengurus setelah menjalankan program kerja.']
                ],
                'highlights' => [
                    'Campfire & Barbecue Party',
                    'Acoustic Live Performance & Seni Bakat',
                    'Awarding Category Ter-Ter HMJ MI'
                ],
                'order_index' => 11,
            ],
            [
                'title' => 'Perpisahan Mahasiswa Semester Akhir',
                'category' => 'agenda',
                'department_id' => 'inti',
                'description' => 'Sebuah acara apresiasi dan pelepasan bagi para senior yang telah menyelesaikan masa studinya, sebagai bentuk penghargaan atas kontribusi mereka.',
                'image_url' => null,
                'images' => [],
                'link' => null,
                'icon' => 'Briefcase',
                'frequency' => 'Setiap Tahun',
                'type' => 'Offline',
                'benefits' => [
                    ['title' => 'Penghormatan Senior', 'description' => 'Bentuk apresiasi terakhir bagi kakak tingkat yang telah menyelesaikan studinya.'],
                    ['title' => 'Jejaring Alumni', 'description' => 'Memelihara hubungan baik dan relasi profesional dengan lulusan baru.']
                ],
                'highlights' => [
                    'Pesan Kesan & Kesaksian Perjalanan Kuliah',
                    'Pemutaran Video Dokumenter Angkatan',
                    'Pemberian Cinderamata Kelulusan'
                ],
                'order_index' => 12,
            ],
            [
                'title' => 'VIBE',
                'category' => 'agenda',
                'department_id' => 'inti',
                'description' => 'VIBE (Visiting - Interacting - Building - Exchanging) adalah program kunjungan ke organisasi mahasiswa (Ormawa) lain di lingkungan Politeknik Negeri Sriwijaya untuk mempererat silaturahmi, berinteraksi, dan saling bertukar ide serta gagasan mengenai program kerja masing-masing.',
                'image_url' => null,
                'images' => [],
                'link' => null,
                'icon' => 'Briefcase',
                'frequency' => 'Setiap Tahun',
                'type' => 'Offline',
                'benefits' => [
                    ['title' => 'Studi Banding', 'description' => 'Mempelajari inovasi dan tata kelola organisasi dari Ormawa mitra.'],
                    ['title' => 'Sinergi Ormawa', 'description' => 'Membuka peluang kerja sama program kerja kolaboratif di masa depan.']
                ],
                'highlights' => [
                    'Forum Group Discussion (FGD) Antar Divisi',
                    'Pemberian Plakat Kerja Sama',
                    'Games Persahabatan & Foto Bersama'
                ],
                'order_index' => 13,
            ],
        ];

        foreach ($programs as $programData) {
            WorkProgram::create($programData);
        }
    }
}
