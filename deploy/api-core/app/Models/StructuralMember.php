<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StructuralMember extends Model
{
    use HasFactory;

    protected $table = 'structural_members';

    protected $fillable = [
        'name',
        'role',
        'class',
        'avatar',
        'instagram',
        'department_id',
        'division_id',
        'type',
        'order_index',
        'image_rotation',
        'image_grayscale',
        'image_object_position',
        'image_zoom',
    ];
}
