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
        'active',
    ];
    protected $hidden = [
        'id',
        'supplier_id',
        'import_id',
    ];
    public function product_imp_detail()
    {
        return $this->belongsTo(ProductImport::class, 'import_id');
    }
    public function supplier_detail()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'id');
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