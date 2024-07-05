<?php

namespace App\Models;

use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DayOffs extends Model
{
    use HasFactory, GeneratesUniqueActive;
    use SoftDeletes;
    protected $fillable = [
        "id",
        "staff_id",
        "day_off",
        "reason",
        "type"
    ];
    protected $hidden = [
        "id",
        "staff_id",
    ];
    public function staff_dayoff()
    {
        return $this->belongsTo(Staff::class, "staff_id");
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
