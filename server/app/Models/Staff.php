<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\GeneratesUniqueActive;

class Staff extends Model
{
    use HasFactory, GeneratesUniqueActive;
    use SoftDeletes;
    protected $fillable = [
        "name",
        "birthday",
        "image",
        "phone",
        "idcard",
        "address",
        // "user_id",
        "position_id",
        "status",
        "active"
        // "staff_salary",
    ];
    protected $hidden = [
        "id",
        "position_id",
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
    public function position()
    {
        return $this->belongsTo(Position::class);
    }
}
