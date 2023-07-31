<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SgCategoryItem extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function categoryName ()
    {
        return $this->belongsTo(ItemCategory::class, 'item_category_id');
    }
}
