<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MmCategoryItem extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];

    public function categoryName()
    {
        return $this->belongsTo(ItemCategory::class, 'item_category_id');
    }
}
