<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Default Admin User
        User::updateOrCreate(
            ['email' => 'admin@hmjmi.com'],
            [
                'username' => 'Admin HMJ',
                'password' => Hash::make('adminhmj2026'),
                'role' => 'admin',
                'department_id' => 'inti',
                'avatar' => 'https://placehold.co/100x100.png?text=A',
            ]
        );
        $this->command->info("Seeded default admin user: admin@hmjmi.com | adminhmj2026");

        $exportDir = base_path('../firebase_export');

        // 2. Seed Berita Acara
        $beritaPath = $exportDir . '/berita_acara.json';
        if (File::exists($beritaPath)) {
            $berita = json_decode(File::get($beritaPath), true);
            if (is_array($berita)) {
                foreach ($berita as $item) {
                    $date = isset($item['date']['seconds']) ? date('Y-m-d H:i:s', $item['date']['seconds']) : null;
                    $updatedAt = isset($item['updatedAt']['seconds']) ? date('Y-m-d H:i:s', $item['updatedAt']['seconds']) : null;
                    
                    DB::table('berita_acara')->updateOrInsert(
                        ['id' => $item['id']],
                        [
                            'title' => $item['title'] ?? 'Untitled',
                            'content' => $item['content'] ?? '',
                            'image_url' => $item['imageUrl'] ?? null,
                            'category' => $item['category'] ?? 'Berita HMJ',
                            'status' => $item['status'] ?? 'draft',
                            'author' => $item['author'] ?? 'Admin HMJ',
                            'likes' => $item['likes'] ?? 0,
                            'date' => $date,
                            'created_at' => $date ?: now(),
                            'updated_at' => $updatedAt ?: now(),
                        ]
                    );
                }
                $this->command->info("Seeded berita_acara table successfully.");
            }
        }

        // 3. Seed Comments
        $commentsPath = $exportDir . '/comments.json';
        if (File::exists($commentsPath)) {
            $comments = json_decode(File::get($commentsPath), true);
            if (is_array($comments)) {
                foreach ($comments as $item) {
                    $date = isset($item['date']['seconds']) ? date('Y-m-d H:i:s', $item['date']['seconds']) : null;
                    DB::table('comments')->updateOrInsert(
                        ['id' => $item['id'] ?? null],
                        [
                            'post_id' => $item['post_id'],
                            'author' => $item['author'],
                            'content' => $item['content'],
                            'status' => $item['status'] ?? 'pending',
                            'date' => $date,
                            'created_at' => $date ?: now(),
                            'updated_at' => now(),
                        ]
                    );
                }
                $this->command->info("Seeded comments table successfully.");
            }
        }

        // 4. Seed Site Stats
        $analyticsPath = $exportDir . '/analytics.json';
        if (File::exists($analyticsPath)) {
            $analytics = json_decode(File::get($analyticsPath), true);
            if (is_array($analytics)) {
                foreach ($analytics as $item) {
                    if ($item['id'] === 'site_stats') {
                        DB::table('site_stats')->updateOrInsert(
                            ['id' => 1],
                            [
                                'visitor_count' => $item['visitorCount'] ?? 0,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]
                        );
                    }
                }
                $this->command->info("Seeded site_stats table successfully.");
            }
        }

        // 5. Seed Daily Visits
        $visitsPath = $exportDir . '/daily_visits.json';
        if (File::exists($visitsPath)) {
            $visits = json_decode(File::get($visitsPath), true);
            if (is_array($visits)) {
                foreach ($visits as $item) {
                    $date = $item['date'] ?? $item['id'];
                    DB::table('daily_visits')->updateOrInsert(
                        ['visit_date' => $date],
                        [
                            'count' => $item['count'] ?? 0,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]
                    );
                }
                $this->command->info("Seeded daily_visits table successfully.");
            }
        }

        // 6. Seed Gallery Items (Default 11 activities)
        $defaultGalleryItems = [
            [
                'category' => 'gallery',
                'title' => 'BUKBER MI',
                'image_url' => '/Galeri/BUKBERMI.jpg',
                'year' => '2025',
                'caption' => 'Momen kebersamaan buka bersama Jurusan Manajemen Informatika.',
                'order_index' => 0
            ],
            [
                'category' => 'gallery',
                'title' => 'BUKBER HMJ',
                'image_url' => '/Galeri/BUKBRHMJ.jpg',
                'year' => '2025',
                'caption' => 'Buka bersama Himpunan Mahasiswa Jurusan.',
                'order_index' => 1
            ],
            [
                'category' => 'gallery',
                'title' => 'Family Gathering',
                'image_url' => '/Galeri/FamilyGatrhing.jpg',
                'year' => '2025',
                'caption' => 'Acara kebersamaan dan outbound pengurus HMJ.',
                'order_index' => 2
            ],
            [
                'category' => 'gallery',
                'title' => 'LDO HMJMI',
                'image_url' => '/Galeri/LDOHMJMI.jpg',
                'year' => '2025',
                'caption' => 'Latihan Dasar Organisasi untuk pengurus baru.',
                'order_index' => 3
            ],
            [
                'category' => 'gallery',
                'title' => 'Makrab',
                'image_url' => '/Galeri/Makrab.jpg',
                'year' => '2025',
                'caption' => 'Malam Keakraban Mahasiswa Manajemen Informatika.',
                'order_index' => 4
            ],
            [
                'category' => 'gallery',
                'title' => 'Open Recruitment',
                'image_url' => '/Galeri/OR.jpg',
                'year' => '2025',
                'caption' => 'Penerimaan anggota baru Himpunan Mahasiswa Jurusan.',
                'order_index' => 5
            ],
            [
                'category' => 'gallery',
                'title' => 'POSMI',
                'image_url' => '/Galeri/Posmi.jpg',
                'year' => '2025',
                'caption' => 'Pekan Olahraga Seni Mahasiswa Informatika.',
                'order_index' => 6
            ],
            [
                'category' => 'gallery',
                'title' => 'Seminar Bisnis',
                'image_url' => '/Galeri/Sembis.jpg',
                'year' => '2025',
                'caption' => 'Seminar bisnis kewirausahaan digital.',
                'order_index' => 7
            ],
            [
                'category' => 'gallery',
                'title' => 'SINTAK',
                'image_url' => '/Galeri/Sintak.jpg',
                'year' => '2025',
                'caption' => 'Workshop koding dan teknologi terkini.',
                'order_index' => 8
            ],
            [
                'category' => 'gallery',
                'title' => 'Upgrading',
                'image_url' => '/Galeri/Upgrading.jpg',
                'year' => '2025',
                'caption' => 'Upgrading skill kepemimpinan dan organisasi.',
                'order_index' => 9
            ],
            [
                'category' => 'gallery',
                'title' => 'IT Festival',
                'image_url' => '/Galeri/IT-fest.jpg',
                'year' => '2025',
                'caption' => 'Festival Teknologi dan kompetisi IT nasional.',
                'order_index' => 10
            ]
        ];

        foreach ($defaultGalleryItems as $item) {
            DB::table('gallery_items')->updateOrInsert(
                [
                    'category' => $item['category'],
                    'title' => $item['title']
                ],
                [
                    'image_url' => $item['image_url'],
                    'year' => $item['year'],
                    'caption' => $item['caption'],
                    'order_index' => $item['order_index'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
        $this->command->info("Seeded gallery_items table successfully.");

        // 7. Seed Structural Members
        $this->call(StructuralMemberSeeder::class);
    }
}
