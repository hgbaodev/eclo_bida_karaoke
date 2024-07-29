<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesUniqueActive;

class Salary extends Model
{
    use HasFactory, GeneratesUniqueActive;
    protected $fillable = [
        "staff_id",
        "month",
        "year",
        "base_salary",
        "working_days",
        "off_days",
        "off_days_unapproved",
        "working_hours",
        "active",
        "total"
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
        return $this->belongsTo(Staff::class, 'staff_id');
    }
}
