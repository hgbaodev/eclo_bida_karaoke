<?php

namespace App\Models;

use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShiftDetail extends Model
{
    use HasFactory, SoftDeletes, GeneratesUniqueActive;
    protected $fillable = [
        "id",
        "shift_id",
        "day_of_week",
        "quantity_of_staff",
        "active"
    ];

    protected $hidden = [
        "id"
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
}
