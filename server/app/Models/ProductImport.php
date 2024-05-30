<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductImport extends Model
{

    public $timestamps = false;
    use HasFactory;
    protected $fillable = [
        'total_cost',
        'create_time',
        'receive_time',
        'status',
        'active',
    ];
    protected $hidden = [
        'id',
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
    public function productimport()
    {
        return $this->hasMany(ProductImpDetail::class);
    }
}