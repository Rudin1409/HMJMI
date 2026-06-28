<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->text('bio')->nullable()->after('avatar');
        });

        Schema::table('berita_acara', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable()->after('author');
            $table->boolean('show_author_info')->default(true)->after('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('bio');
        });

        Schema::table('berita_acara', function (Blueprint $table) {
            $table->dropColumn(['user_id', 'show_author_info']);
        });
    }
};
