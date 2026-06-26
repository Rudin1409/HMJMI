<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CabinetSetting extends Model
{
    use HasFactory;

    protected $table = 'cabinet_settings';

    protected $fillable = [
        'cabinet_name',
        'logo_path',
        'overall_philosophy',
        'color_meanings',
        'symbol_meanings',
    ];

    protected $casts = [
        'color_meanings' => 'array',
        'symbol_meanings' => 'array',
    ];
}
