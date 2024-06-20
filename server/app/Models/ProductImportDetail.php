<?php

namespace App\Models;

use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductImportDetail extends Model
{
    use HasFactory, SoftDeletes, GeneratesUniqueActive;
    protected $fillable = [
        'quantity',
        'cost_price',
        'supplier_id',
        'import_id',
        'id_product',
        'active',
    ];
    protected $hidden = [
        'id_product',
        'supplier_id',
        'import_id',
        'id'
    ];
    public function product_import()
    {
        return $this->belongsTo(ProductImport::class, 'import_id');
    }
    public function supplier_detail()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->active)) {
                $model->active = self::generateUniqueActive();
            }
        });

        static::saved(function ($productimport) {
            $productimport->product_import->updateTotalCost();
        });
    }
}
