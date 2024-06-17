<?php

namespace App\Models;

use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Price extends Model
{
    use HasFactory, SoftDeletes, GeneratesUniqueActive;

    public $timestamps = true;

    protected $fillable = [
        'name',
        'status',
        'pricePerHour',
        'active',
    ];

    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
        'deleted_at',
        'service_type_id'
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

    public function services()
    {
        return $this->hasMany(Service::class);
    }
}
