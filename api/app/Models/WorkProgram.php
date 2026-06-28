<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['title', 'category', 'department_id', 'description', 'image_url', 'images', 'link', 'icon', 'frequency', 'type', 'benefits', 'highlights', 'order_index'])]
class WorkProgram extends Model
{
    use HasFactory;

    protected $table = 'work_programs';

    protected $casts = [
        'benefits' => 'array',
        'highlights' => 'array',
        'images' => 'array',
    ];
}
