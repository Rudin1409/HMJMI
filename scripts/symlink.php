<?php
// Script to create/recreate symlink for Laravel storage on cPanel
// Run via browser: https://yourdomain.com/api/symlink.php

$target = __DIR__ . '/storage';
$source = __DIR__ . '/../../api-core/storage/app/public';

echo "<h1>cPanel Laravel Storage Symlink Creator</h1>";
echo "<p>Source (api-core storage): <code>" . realpath($source) . " ($source)</code></p>";
echo "<p>Target (public_html/api/storage): <code>$target</code></p>";

// Step 1: Remove old storage link/folder if it exists
if (file_exists($target) || is_link($target)) {
    if (is_link($target)) {
        echo "<p style='color: orange;'>Menghapus symlink lama...</p>";
        unlink($target);
    } elseif (is_dir($target)) {
        echo "<p style='color: orange;'>Menghapus folder 'storage' lama (bukan symlink)...</p>";
        // Use rmdir for empty dirs, or shell for non-empty
        if (PHP_OS_FAMILY === 'Windows') {
            exec('rmdir /s /q "' . $target . '"');
        } else {
            exec('rm -rf "' . $target . '"');
        }
    } else {
        echo "<p style='color: orange;'>Menghapus file 'storage' lama...</p>";
        unlink($target);
    }
}

// Step 2: Ensure source directory exists
if (!file_exists($source)) {
    echo "<p style='color: orange;'>Warning: Source directory belum ada. Membuat folder kosong...</p>";
    @mkdir($source, 0755, true);
}

// Also ensure proker subfolder exists
$prokerDir = $source . '/proker';
if (!file_exists($prokerDir)) {
    @mkdir($prokerDir, 0755, true);
    echo "<p>Membuat subfolder proker/ di storage...</p>";
}

// Step 3: Create symlink
if (symlink($source, $target)) {
    echo "<p style='color: green; font-weight: bold; font-size: 1.2em;'>✅ Symlink berhasil dibuat!</p>";
    echo "<p>Gambar yang diupload melalui dashboard admin sekarang bisa diakses oleh browser.</p>";
    
    // Verify it works
    if (is_dir($target)) {
        $files = scandir($target);
        $fileCount = count($files) - 2; // minus . and ..
        echo "<p style='color: green;'>Verifikasi OK — symlink bekerja. Jumlah item di storage: $fileCount</p>";
    }
} else {
    echo "<p style='color: red; font-weight: bold;'>❌ Gagal membuat symlink secara otomatis.</p>";
    echo "<p>Coba buat secara manual melalui <b>cPanel Terminal</b> atau <b>Cron Jobs</b> dengan perintah:</p>";
    echo "<pre style='background:#222;color:#0f0;padding:10px;border-radius:5px;'>ln -s " . realpath($source) . " $target</pre>";
}

echo "<hr>";
echo "<p style='color: gray; font-size: 0.85em;'>⚠️ PENTING: Hapus file symlink.php ini setelah berhasil demi keamanan!</p>";

// Self-delete after first successful run
// Uncomment the line below if you want auto-delete:
// @unlink(__FILE__);
?>
