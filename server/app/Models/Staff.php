<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Staff extends Model
{
    use HasFactory;
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
        "active"
        // "staff_salary",
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
        return $this->hasOne(Position::class);
    }
}
