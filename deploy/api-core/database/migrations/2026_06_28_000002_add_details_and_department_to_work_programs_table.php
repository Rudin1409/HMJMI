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
        Schema::table('work_programs', function (Blueprint $table) {
            $table->string('department_id', 50)->nullable()->after('category');
            $table->string('frequency', 100)->nullable()->after('link');
            $table->string('type', 50)->default('Offline')->after('frequency');
            $table->text('benefits')->nullable()->after('type'); // JSON array of benefits [{title, description}]
            $table->text('highlights')->nullable()->after('benefits'); // JSON array of strings
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('work_programs', function (Blueprint $table) {
            $table->dropColumn(['department_id', 'frequency', 'type', 'benefits', 'highlights']);
        });
    }
};
