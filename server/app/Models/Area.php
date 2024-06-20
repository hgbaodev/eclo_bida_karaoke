<?php

namespace App\Models;

use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Area extends Model
{
    use HasFactory, SoftDeletes, GeneratesUniqueActive;

    public $timestamps = false;

    protected $fillable = [
        'active',
        'name',
        'description',
    ];

    protected $hidden = [
        'id',
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

    public function services()
    {
        return $this->hasMany(Service::class, 'area_id', 'id');
    }
}
