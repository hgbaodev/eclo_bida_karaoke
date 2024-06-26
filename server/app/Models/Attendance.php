<?php

namespace App\Models;

use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Attendance extends Model
{
    use HasFactory, SoftDeletes, Notifiable, GeneratesUniqueActive;

    public $timestamps = true;

    protected $fillable = [
        'staff_id',
        'day',
        'time_in',
        'time_out',
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
    public function product_type()
    {
        return $this->belongsTo(Staff::class, 'staff_id');
    }
}
