<?php
// Script to create symlink for Laravel storage on cPanel
$target = __DIR__ . '/storage';
$source = __DIR__ . '/../../api-core/storage/app/public';

echo "<h1>cPanel Laravel Storage Symlink Creator</h1>";
echo "<p>Source: <code>$source</code></p>";
echo "<p>Target: <code>$target</code></p>";

if (file_exists($target)) {
    if (is_link($target)) {
        echo "<p style='color: orange; font-weight: bold;'>Symlink 'storage' already exists and points to " . readlink($target) . "</p>";
    } else {
        echo "<p style='color: red; font-weight: bold;'>A directory or file named 'storage' already exists and is NOT a symlink! Please delete or rename the existing 'storage' folder in public_html/api/ first.</p>";
    }
} else {
    // Check if source exists, if not we warn but still try
    if (!file_exists($source)) {
        echo "<p style='color: orange;'>Warning: Source directory does not exist yet. Make sure api-core is uploaded and extracted at the correct path.</p>";
    }
    
    if (symlink($source, $target)) {
        echo "<p style='color: green; font-weight: bold;'>Successfully created symlink!</p>";
    } else {
        echo "<p style='color: red; font-weight: bold;'>Failed to create symlink. Please ask your hosting provider if symlink function is disabled, or create the symlink manually using cPanel Cron Jobs with command: <code>ln -s $source $target</code></p>";
    }
}
?>
