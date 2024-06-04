<?php

namespace App\Models;

use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shift extends Model
{
    use HasFactory, GeneratesUniqueActive, SoftDeletes;
    protected $fillable = [
        "time_in",
        "time_out",
        "status",
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
    public function shiftDetail()
    {
        return $this->hasMany(ShiftDetail::class);
    }
}
