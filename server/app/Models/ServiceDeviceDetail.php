<?php

namespace App\Models;

use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceDeviceDetail extends Model
{
    use HasFactory, SoftDeletes, GeneratesUniqueActive;

    protected $table = 'service_device_detail';

    protected $fillable = [
        'active',
        'status',
        'service_id',
        'device_id',
        'quantity',
        'maintaining_quantity',
    ];

    protected $hidden = [
        'id',
        'deleted_at',
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

    public function device()
    {
        return $this->belongsTo(Device::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

}
