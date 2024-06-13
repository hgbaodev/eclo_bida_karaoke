<?php

namespace App\Models;

use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShiftUserDetail extends Model
{
    use HasFactory, SoftDeletes, GeneratesUniqueActive;
    protected $fillable = [
        "staff_id",
        "shift_id",
        "day_of_week",
        "active"
    ];
    protected $hidden = [
        "id",
        "staff_id",
        "shift_id"
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
    public function staff()
    {
        return $this->belongsTo(Staff::class, "staff_id");
    }
    public function shift()
    {
        return $this->belongsTo(Shift::class, "shift_id");
    }
}
