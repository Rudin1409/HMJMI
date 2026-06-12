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
        Schema::create('berita_acara', function (Blueprint $table) {
            $table->string('id', 100)->primary(); // Retain Firestore ID
            $table->string('title', 255);
            $table->text('content');
            $table->string('image_url', 255)->nullable();
            $table->string('category', 100);
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->string('author', 100);
            $table->integer('likes')->default(0);
            $table->timestamp('date')->nullable(); // Original document date
            $table->timestamps();
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string('post_id', 100);
            $table->string('author', 100);
            $table->text('content');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamp('date')->nullable(); // Original comment date
            $table->timestamps();

            $table->foreign('post_id')->references('id')->on('berita_acara')->onDelete('cascade');
        });

        Schema::create('site_stats', function (Blueprint $table) {
            $table->integer('id')->primary()->default(1);
            $table->integer('visitor_count')->default(0);
            $table->timestamps();
        });

        Schema::create('daily_visits', function (Blueprint $table) {
            $table->date('visit_date')->primary();
            $table->integer('count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_visits');
        Schema::dropIfExists('site_stats');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('berita_acara');
    }
};
