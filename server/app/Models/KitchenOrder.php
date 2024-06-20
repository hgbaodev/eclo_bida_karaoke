<?php

namespace App\Models;

use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class KitchenOrder extends Model
{
    use HasFactory, SoftDeletes, GeneratesUniqueActive;

    protected $fillable = [
        'active',
        'status',
        'order_id',
        'product_id',
        ];

    protected $hidden = [
        'id',
        'deleted_at',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
