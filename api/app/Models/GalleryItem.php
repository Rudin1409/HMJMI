<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalleryItem extends Model
{
    use HasFactory;

    protected $table = 'gallery_items';

    protected $fillable = [
        'category',
        'title',
        'image_url',
        'year',
        'caption',
        'order_index',
    ];

    protected $casts = [
        'order_index' => 'integer',
    ];
}
