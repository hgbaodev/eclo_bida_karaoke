<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\GeneratesUniqueActive;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    public $timestamps = false;
    use HasFactory, GeneratesUniqueActive;
    use SoftDeletes;
    protected $fillable = [
        'id',
        'name',
        'image',
        'description',
        'selling_price',
        'active',
        'id_type',
        'quantity',
    ];
    protected $hidden = [
        'pivot'
    ];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->active)) {
                $model->active = self::generateUniqueActive();
            }
        });
    }
    public function products()
    {
        return $this->hasMany(ProductImportDetail::class);
    }

    public function product_type()
    {
        return $this->belongsTo(ProductType::class, 'id_type');
    }
    public function kitchenOrders()
    {
        return $this->hasMany(KitchenOrder::class);
    }
}
