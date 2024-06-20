<?php

namespace App\Models;

use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes, GeneratesUniqueActive;

    protected $fillable = [
        'name',
        'description',
        'status',
        'active',
        'area_id',
        'price_id',
        'service_type_id',
        'created_at'
    ];

    protected $hidden = [
        'id',
        'area_id',
        'price_id',
        'service_type_id',
        'updated_at',
        'deleted_at'
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

    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    public function price()
    {
        return $this->belongsTo(Price::class);
    }

    public function serviceType()
    {
        return $this->belongsTo(ServiceType::class);
    }
}
