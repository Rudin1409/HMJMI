# Panduan Pembaruan (Update) Website HMJMI di cPanel

Dokumen ini menjelaskan langkah-langkah lengkap dan mudah untuk memperbarui kode program di hosting cPanel jika ada perubahan kode (update) di masa mendatang.

---

## Skenario 1: Hanya Ada Pembaruan Frontend (Next.js)
*Gunakan skenario ini jika Anda hanya mengubah tampilan, tata letak, teks, CSS/styling, atau aset gambar di folder Next.js (bukan di folder `api/`).*

### Langkah-langkah:
1. Buka terminal komputer lokal Anda di root proyek (`E:\laragon\www\HMJMI`).
2. Jalankan skrip pengepakan:
   ```bash
   node scripts/prepare-deploy.js https://hmjmi.polsri.ac.id/api/api
   ```
3. Buka folder `deploy/public_html` hasil build baru.
4. Kompres semua berkas di dalam folder tersebut menjadi file ZIP (beri nama **`public_html.zip`**).
5. Masuk ke **cPanel File Manager**.
6. Buka folder **`public_html/`** di cPanel.
7. Unggah berkas `public_html.zip` baru tersebut, lalu **Extract**.
8. **Selesai!** Perubahan tampilan frontend Anda langsung aktif.

---

## Skenario 2: Hanya Ada Pembaruan Backend (Laravel API)
*Gunakan skenario ini jika Anda menambahkan logika API baru, memodifikasi Controller, Model, Middleware, atau berkas routes di folder `api/` (bukan database/tabel).*

### Langkah-langkah:
1. Buka folder `api/` di laptop Anda.
2. Kompres folder berikut menjadi satu file zip (misalnya **`api-update.zip`**):
   * `app/`
   * `config/`
   * `routes/`
   * `resources/` (jika ada file email template/view baru)
   * *(PENTING: Jangan menyertakan `.env` atau `bootstrap/cache` dari lokal agar tidak merusak config cPanel!)*
3. Masuk ke **cPanel File Manager**.
4. Masuk ke folder **`api-core/`** (yaitu `/home/username/api-core/`).
5. Unggah berkas `api-update.zip` ke sana lalu **Extract** dan pilih opsi overwrite/ganti berkas lama.
6. **Selesai!** API backend Anda telah diperbarui.

---

## Skenario 3: Ada Perubahan Struktur Database (Migrasi Tabel / Update Kolom)
*Gunakan skenario ini jika Anda menambahkan tabel baru, mengubah kolom (seperti update tipe role penulis), atau menjalankan migration Laravel di lokal.*

Terdapat dua cara untuk menerapkan perubahan database ke cPanel:

### Opsi A: Migrasi Otomatis Tanpa Menghapus Data Live (Sangat Direkomendasikan! ⭐)
*Cara ini paling aman karena sistem hanya akan mengupdate struktur tabel (seperti menambah kolom/opsi baru) **tanpa menghapus** berita, galeri, program kerja, atau user admin yang sudah di-input oleh pengguna langsung di website cPanel.*

1. Jalankan skrip pengepakan di terminal lokal Anda terlebih dahulu agar berkas penolong `migrate.php` terbaru ikut dikemas ke folder `deploy/`:
   ```bash
   node scripts/prepare-deploy.js https://hmjmi.polsri.ac.id/api/api
   ```
2. Pastikan file backend Laravel terbaru Anda sudah di-upload ke cPanel (`api-core/database/migrations` harus terupdate).
3. Upload berkas **`migrate.php`** dari folder lokal `deploy/public_html/api/` ke folder **`public_html/api/`** di cPanel Anda.
4. Buka browser Anda dan akses alamat migrasi otomatis:
   👉 **`https://hmjmi.polsri.ac.id/api/migrate.php`**
5. Halaman web tersebut akan memicu Laravel menjalankan `php artisan migrate --force` secara aman di server cPanel.
6. Jika muncul laporan sukses berwarna hijau, database cPanel Anda sekarang sudah diperbarui.
7. **[PENTING]** Segera **hapus berkas `migrate.php`** di dalam folder `public_html/api/` via cPanel File Manager demi alasan keamanan.

### Opsi B: Timpa Total Database Menggunakan SQL Dump Lokal
*Cara ini berguna jika Anda ingin menyamakan isi data database di cPanel secara 100% persis dengan database laptop lokal Anda (misal database cPanel masih kosong atau Anda ingin mereset total database cPanel).*
> ⚠️ **PERINGATAN:** Cara ini akan **menghapus/menimpa** seluruh data berita, gambar yang terdaftar, komentar, dan akun pengguna yang sudah ada di cPanel.

1. Saat Anda menjalankan perintah `node scripts/prepare-deploy.js`, skrip akan otomatis mencoba mengekspor database lokal Anda menjadi file **`deploy/latest_db_backup.sql`**.
2. Masuk ke **cPanel phpMyAdmin**.
3. Pilih database website HMJMI Anda di sebelah kiri.
4. (Opsional) Hapus (Drop) semua tabel yang ada jika ingin bersih, atau langsung timpa.
5. Klik tab **Import** di bagian atas phpMyAdmin.
6. Pilih file **`latest_db_backup.sql`** yang ada di folder `deploy/` lokal laptop Anda.
7. Klik **Go** / **Kirim** di bawah halaman untuk memulai import.
8. Selesai! Database di cPanel sekarang identik dengan database lokal Anda.
