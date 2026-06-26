<?php

namespace App\Http\Controllers;

use App\Models\CabinetSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CabinetSettingController extends Controller
{
    private function getOrCreateSettings()
    {
        $settings = CabinetSetting::find(1);
        if (!$settings) {
            $settings = CabinetSetting::create([
                'id' => 1,
                'cabinet_name' => 'Kabinet Karsadhikara',
                'logo_path' => asset('logo/logokabinet.png'),
                'overall_philosophy' => 'Secara keseluruhan, logo ini mencerminkan semangat kebangkitan, adaptasi, dan inovasi dalam bidang teknologi dan manajemen organisasi, menjadikan Himpunan Mahasiswa Manajemen Informatika sebagai entitas yang selalu berkembang dan siap menghadapi tantangan zaman.',
                'color_meanings' => [
                    ['name' => 'Merah & Oranye', 'description' => 'Melambangkan keberanian dan semangat.', 'class' => 'bg-red-500'],
                    ['name' => 'Emas & Kuning', 'description' => 'Melambangkan keunggulan dan kepemimpinan.', 'class' => 'bg-yellow-500'],
                    ['name' => 'Putih', 'description' => 'Melambangkan kedamaian dan netral.', 'class' => 'bg-white border border-gray-300'],
                    ['name' => 'Biru', 'description' => 'Melambangkan kebijaksanaan dan ketenangan.', 'class' => 'bg-blue-500'],
                    ['name' => 'Pink', 'description' => 'Melambangkan kelembutan dan perubahan yang positif.', 'class' => 'bg-pink-500'],
                    ['name' => 'Abu-abu', 'description' => 'Melambangkan kebijaksanaan dan kedewasaan.', 'class' => 'bg-gray-500'],
                ],
                'symbol_meanings' => [
                    [
                        'icon' => 'Feather',
                        'title' => 'Ekor di Bawah',
                        'description' => 'Melambangkan 5 divisi dengan warna merah dan oranye, merepresentasikan energi, semangat juang, keberanian menyuarakan aspirasi, dan peran aktif dalam memperjuangkan kepentingan jurusan.'
                    ],
                    [
                        'icon' => 'Wind',
                        'title' => 'Sayap Terbentang',
                        'description' => 'Melambangkan 11 divisi dan kesiapan untuk terbang tinggi, menjangkau luas, dan menyebarkan pengaruh positif sebagai wadah aspirasi, ide, dan semangat kolaboratif.'
                    ],
                    [
                        'icon' => 'Sparkles',
                        'title' => 'Hiasan Biru di Atas Kepala',
                        'description' => 'Melambangkan sikap berkepala dingin dan ketenangan dalam menghadapi setiap masalah, baik di dalam maupun di luar himpunan.'
                    ],
                    [
                        'icon' => 'Cpu',
                        'title' => 'Elemen IT di Dada Phoenix',
                        'description' => 'Pola sirkuit motherboard yang menjadi inti dari Jurusan Manajemen Informatika, mencerminkan inovasi, teknologi, serta peran utama dalam dunia digital.'
                    ],
                ]
            ]);
        }
        return $settings;
    }

    public function show()
    {
        $settings = $this->getOrCreateSettings();
        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $settings = $this->getOrCreateSettings();

        $request->validate([
            'cabinet_name' => 'required|string|max:255',
            'overall_philosophy' => 'required|string',
            'color_meanings' => 'required|json',
            'symbol_meanings' => 'required|json',
            'logo_file' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:1024',
        ]);

        $data = [
            'cabinet_name' => $request->cabinet_name,
            'overall_philosophy' => $request->overall_philosophy,
            'color_meanings' => json_decode($request->color_meanings, true),
            'symbol_meanings' => json_decode($request->symbol_meanings, true),
        ];

        if ($request->hasFile('logo_file')) {
            // Delete old file if uploaded to local storage
            if (str_contains($settings->logo_path, asset('storage/'))) {
                $oldPath = str_replace(asset('storage/'), '', $settings->logo_path);
                if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $path = \App\Helpers\ImageOptimizer::optimizeAndSave($request->file('logo_file'), 'kabinet');
            $data['logo_path'] = asset('storage/' . $path);
        }

        $settings->update($data);

        return response()->json($settings);
    }
}
