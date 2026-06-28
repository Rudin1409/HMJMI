<?php
// Script to run database migrations on cPanel without SSH
define('LARAVEL_START', microtime(true));

// Load Composer autoloader
require __DIR__.'/../../api-core/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__.'/../../api-core/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

echo "<h1>cPanel Laravel Database Migrator</h1>";
echo "<p>Running database migrations...</p>";

try {
    // Run the migrate Artisan command with force option for production
    $status = $kernel->call('migrate', ['--force' => true]);
    
    echo "<p style='color: green; font-weight: bold;'>Migrations executed successfully!</p>";
    echo "<h3>Artisan Output:</h3>";
    echo "<pre style='background: #f4f4f4; padding: 15px; border-radius: 5px; border: 1px solid #ddd;'>";
    echo \Illuminate\Support\Facades\Artisan::output();
    echo "</pre>";
} catch (Exception $e) {
    echo "<p style='color: red; font-weight: bold;'>Error executing migrations:</p>";
    echo "<pre style='color: red; background: #fff2f2; padding: 15px; border-radius: 5px; border: 1px solid #f5c2c2;'>";
    echo $e->getMessage() . "\n" . $e->getTraceAsString();
    echo "</pre>";
}
?>
