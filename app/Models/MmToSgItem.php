<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MmToSgItem extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function category()
    {
        return $this->hasMany(MmCategoryItem::class, 'mm_to_sg_id');
    }
}
