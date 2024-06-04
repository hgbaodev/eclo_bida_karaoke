<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImpDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'quantity',
        'cost_price',
        'supplier_id',
        'import_id',
        'active',
    ];
    protected $hidden = [
        'id',
        'supplier_id',
        'import_id',
    ];
    public function product_imp_detail()
    {
        return $this->belongsTo(ProductImport::class);
    }
    public function supplier_detial()
    {
        return $this->belongsTo(Supplier::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->active)) {
                $model->active = self::generateUniqueActive();
            }
        });
    }
}