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
        Schema::create('structural_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->string('class'); // Angkatan, e.g. "MI 2024"
            $table->string('avatar'); // Foto URL/Path
            $table->string('instagram')->nullable();
            $table->string('department_id'); // e.g. "inti", "ptkp", "humas", "psdm", "kesma", "bistra"
            $table->string('division_id')->nullable(); // e.g. "akademik", "kepemudaan", "kominfo", "medkraf", "jurnalis"
            $table->enum('type', ['head', 'member'])->default('member'); // heads vs members
            $table->integer('order_index')->default(0);
            
            // Photo display styles
            $table->string('image_rotation')->default('rotate-3'); // rotate-0, rotate-3, -rotate-3, rotate-6, etc.
            $table->string('image_grayscale')->default('none'); // none, grayscale_hover, grayscale_always
            $table->string('image_object_position')->default('object-center'); // object-center, object-top, object-bottom, etc.
            $table->string('image_zoom')->default('scale-100'); // scale-100, scale-105, scale-110, scale-115, etc.
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('structural_members');
    }
};
