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
        Schema::create('cabinet_settings', function (Blueprint $table) {
            $table->id();
            $table->string('cabinet_name');
            $table->string('logo_path');
            $table->text('overall_philosophy');
            $table->json('color_meanings');
            $table->json('symbol_meanings');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cabinet_settings');
    }
};
