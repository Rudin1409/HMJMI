const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DEPLOY_DIR = path.join(PROJECT_ROOT, 'deploy');

// Helper to recursively copy directories
function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(source)) return;
  
  let files = [];
  // Check if folder needs to be created or exists
  const targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      if (file === 'storage') return; // Skip Laravel storage folder
      const curSource = path.join(source, file);
      
      let isSym = false;
      try {
        isSym = fs.lstatSync(curSource).isSymbolicLink();
      } catch (e) {
        // Ignore
      }
      if (isSym) return;

      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        fs.copyFileSync(curSource, path.join(targetFolder, file));
      }
    });
  }
}

// Helper to copy contents of a directory (not the directory itself)
function copyFolderContentsSync(source, target) {
  if (!fs.existsSync(source)) return;
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  files.forEach(function (file) {
    if (file === 'storage') {
      console.log('    - Melewati folder/symlink storage (akan dibuat di cPanel)');
      return;
    }
    const curSource = path.join(source, file);
    
    let isSym = false;
    try {
      isSym = fs.lstatSync(curSource).isSymbolicLink();
    } catch (e) {
      // Ignore
    }
    if (isSym) {
      console.log(`    - Melewati symlink: ${file}`);
      return;
    }

    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, target);
    } else {
      fs.copyFileSync(curSource, path.join(target, file));
    }
  });
}

// Clean up directory
function cleanDirectory(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// Prompts user for input
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => rl.question(query, (ans) => {
    rl.close();
    resolve(ans);
  }));
}

async function main() {
  console.log('==================================================');
  console.log('      HMJMI cPanel Deploy Preparation Script      ');
  console.log('==================================================\n');

  // 1. Get Production URL
  let prodApiUrl = process.argv[2];
  if (!prodApiUrl) {
    console.log('Tentukan URL API Laravel Produksi Anda.');
    console.log('Contoh: https://hmjmi.org/api atau https://api.hmjmi.org/api\n');
    prodApiUrl = await askQuestion('Masukkan URL API Produksi [tekan enter untuk default http://127.0.0.1:8000/api]: ');
    prodApiUrl = prodApiUrl.trim() || 'http://127.0.0.1:8000/api';
  }

  console.log(`\n--> Menggunakan URL API: ${prodApiUrl}`);

  // 2. Write temp .env.production.local for Next.js build
  const envFileContent = `NEXT_PUBLIC_API_URL=${prodApiUrl}\n`;
  const envFilePath = path.join(PROJECT_ROOT, '.env.production.local');
  fs.writeFileSync(envFilePath, envFileContent);
  console.log('--> Menulis berkas lingkungan sementara .env.production.local');

  // 3. Build Next.js
  console.log('--> Memulai Next.js build (output: export)...');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: PROJECT_ROOT });
    console.log('\n[SUCCESS] Next.js static build berhasil dibuat!');
  } catch (error) {
    console.error('\n[ERROR] Gagal melakukan Next.js build. Silakan periksa error di atas.');
    if (fs.existsSync(envFilePath)) fs.unlinkSync(envFilePath);
    process.exit(1);
  }

  // Remove temporary .env file
  if (fs.existsSync(envFilePath)) {
    fs.unlinkSync(envFilePath);
    console.log('--> Menghapus berkas lingkungan sementara .env.production.local');
  }

  // 4. Prepare deploy/ folder
  console.log('--> Menyiapkan direktori deploy/...');
  cleanDirectory(DEPLOY_DIR);
  fs.mkdirSync(DEPLOY_DIR, { recursive: true });

  const publicHtmlDir = path.join(DEPLOY_DIR, 'public_html');
  const apiDir = path.join(publicHtmlDir, 'api');
  const apiCoreDir = path.join(DEPLOY_DIR, 'api-core');

  fs.mkdirSync(publicHtmlDir, { recursive: true });
  fs.mkdirSync(apiDir, { recursive: true });
  fs.mkdirSync(apiCoreDir, { recursive: true });

  // 5. Copy Next.js frontend build (from out/)
  const outDir = path.join(PROJECT_ROOT, 'out');
  if (fs.existsSync(outDir)) {
    console.log('--> Menyalin frontend statis ke deploy/public_html/');
    copyFolderContentsSync(outDir, publicHtmlDir);
  } else {
    console.error('[ERROR] Folder out/ tidak ditemukan. Periksa proses build Next.js.');
    process.exit(1);
  }

  // 6. Copy Laravel public/ files to public_html/api/
  const laravelPublicSource = path.join(PROJECT_ROOT, 'api', 'public');
  if (fs.existsSync(laravelPublicSource)) {
    console.log('--> Menyalin folder public/ Laravel ke deploy/public_html/api/');
    copyFolderContentsSync(laravelPublicSource, apiDir);

    // Remove storage symlink from copy if it exists (we will recreate it on cPanel)
    const copiedStorageLink = path.join(apiDir, 'storage');
    if (fs.existsSync(copiedStorageLink)) {
      fs.rmSync(copiedStorageLink, { recursive: true, force: true });
    }
  } else {
    console.error('[ERROR] Folder api/public tidak ditemukan.');
    process.exit(1);
  }

  // 7. Copy symlink helper script to public_html/api/symlink.php
  const symlinkHelperSource = path.join(PROJECT_ROOT, 'scripts', 'symlink.php');
  if (fs.existsSync(symlinkHelperSource)) {
    fs.copyFileSync(symlinkHelperSource, path.join(apiDir, 'symlink.php'));
    console.log('--> Menyalin scripts/symlink.php ke deploy/public_html/api/symlink.php');
  }

  // 7b. Copy migrate helper script to public_html/api/migrate.php
  const migrateHelperSource = path.join(PROJECT_ROOT, 'scripts', 'migrate.php');
  if (fs.existsSync(migrateHelperSource)) {
    fs.copyFileSync(migrateHelperSource, path.join(apiDir, 'migrate.php'));
    console.log('--> Menyalin scripts/migrate.php ke deploy/public_html/api/migrate.php');
  }

  // 8. Modify public_html/api/index.php paths to point to api-core
  const indexPhpPath = path.join(apiDir, 'index.php');
  if (fs.existsSync(indexPhpPath)) {
    let indexPhpContent = fs.readFileSync(indexPhpPath, 'utf8');
    
    // Modify require path to point to api-core
    indexPhpContent = indexPhpContent.replace(
      `require __DIR__.'/../vendor/autoload.php';`,
      `require __DIR__.'/../../api-core/vendor/autoload.php';`
    );
    indexPhpContent = indexPhpContent.replace(
      `$app = require_once __DIR__.'/../bootstrap/app.php';`,
      `$app = require_once __DIR__.'/../../api-core/bootstrap/app.php';`
    );

    fs.writeFileSync(indexPhpPath, indexPhpContent);
    console.log('--> Menyesuaikan path di deploy/public_html/api/index.php agar menunjuk ke api-core');
  }

  // 9. Copy Laravel Core files to deploy/api-core/
  const laravelRoot = path.join(PROJECT_ROOT, 'api');
  console.log('--> Menyalin berkas utama Laravel (Core) ke deploy/api-core/...');
  
  const foldersToCopy = ['app', 'bootstrap', 'config', 'database', 'resources', 'routes', 'vendor'];
  foldersToCopy.forEach(folder => {
    const srcPath = path.join(laravelRoot, folder);
    if (fs.existsSync(srcPath)) {
      console.log(`    - Menyalin folder ${folder}/...`);
      copyFolderRecursiveSync(srcPath, apiCoreDir);
    }
  });

  const filesToCopy = ['artisan', 'composer.json', 'composer.lock'];
  filesToCopy.forEach(file => {
    const srcPath = path.join(laravelRoot, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, path.join(apiCoreDir, file));
    }
  });

  // Copy .env.example as template
  const envExamplePath = path.join(laravelRoot, '.env.example');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, path.join(apiCoreDir, '.env'));
    console.log('    - Membuat template berkas .env untuk dikonfigurasi di server');
  }

  // 10. Recreate empty Laravel storage directories structure
  console.log('--> Membuat struktur direktori storage Laravel...');
  const storageDirs = [
    'storage/app/private',
    'storage/app/public',
    'storage/framework/cache/data',
    'storage/framework/sessions',
    'storage/framework/views',
    'storage/framework/testing',
    'storage/logs'
  ];
  storageDirs.forEach(dir => {
    const dirPath = path.join(apiCoreDir, dir);
    fs.mkdirSync(dirPath, { recursive: true });
    // Write a placeholder file to make sure git/zip tools capture empty folders
    fs.writeFileSync(path.join(dirPath, '.gitkeep'), '');
  });

  // 11. [Opsional] Export local database SQL
  console.log('--> Mencoba mengekspor database lokal (db_hmjmi) ke deploy/latest_db_backup.sql...');
  try {
    const envContent = fs.readFileSync(path.join(laravelRoot, '.env'), 'utf8');
    const dbNameMatch = envContent.match(/DB_DATABASE=(.*)/);
    const dbUserMatch = envContent.match(/DB_USERNAME=(.*)/);
    const dbPassMatch = envContent.match(/DB_PASSWORD=(.*)/);

    const dbName = dbNameMatch ? dbNameMatch[1].trim() : 'db_hmjmi';
    const dbUser = dbUserMatch ? dbUserMatch[1].trim() : 'root';
    const dbPass = dbPassMatch ? dbPassMatch[1].trim() : '';

    const backupFile = path.join(DEPLOY_DIR, 'latest_db_backup.sql');
    
    let dumpCmd = `mysqldump --user=${dbUser} `;
    if (dbPass) {
      dumpCmd += `--password=${dbPass} `;
    }
    dumpCmd += `${dbName} > "${backupFile}"`;

    execSync(dumpCmd, { stdio: 'ignore' });
    console.log(`[SUCCESS] Berhasil mengekspor SQL terbaru ke: deploy/latest_db_backup.sql`);
  } catch (err) {
    console.log('[INFO] Lewati ekspor database SQL otomatis (mysqldump tidak terinstal di PATH sistem lokal Anda).');
  }

  console.log('\n==================================================');
  console.log('[SUCCESS] Paket Deployment Siap di Folder: deploy/');
  console.log('==================================================');
  console.log('\nLangkah selanjutnya untuk diunggah ke cPanel:');
  console.log('1. Kompres seluruh isi folder `deploy/public_html` menjadi berkas `public_html.zip`.');
  console.log('2. Kompres seluruh isi folder `deploy/api-core` menjadi berkas `api-core.zip`.');
  console.log('3. Melalui File Manager cPanel, upload `api-core.zip` di luar folder `public_html` (misal di `/home/username/api-core`).');
  console.log('4. Upload `public_html.zip` langsung di dalam folder `/home/username/public_html` lalu ekstrak.');
  console.log('5. Buka berkas `/home/username/api-core/.env` di cPanel, sesuaikan nama database, username, password, dan ubah APP_DEBUG menjadi false.');
  console.log('6. Buka browser dan jalankan alamat `https://domainanda.com/api/symlink.php` untuk menghubungkan storage upload gambar.');
  console.log('7. [Sangat Direkomendasikan] Jika ada perubahan database, jalankan `https://domainanda.com/api/migrate.php` di browser.');
  console.log('   (Ini otomatis mengupdate tabel tanpa menghapus data berita/user/proker yang sudah ada di cPanel!)');
  console.log('8. [Alternatif] Jika ingin menimpa database secara total dari kosong, Anda dapat menggunakan berkas `deploy/latest_db_backup.sql` untuk di-import melalui phpMyAdmin.');
  console.log('9. Hapus berkas `symlink.php` dan `migrate.php` di dalam folder `public_html/api/` setelah sukses demi keamanan.');
  console.log('==================================================\n');
}

main().catch(err => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});
