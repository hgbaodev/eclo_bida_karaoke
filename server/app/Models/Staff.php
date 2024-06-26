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
        "first_name",
        "last_name",
        "birthday",
        "image",
        "phone",
        "idcard",
        "gender",
        "uuid",
        "address",
        "position_id",
        "status",
        "active",
        "user_id",
    ];
    protected $hidden = [
        "id",
        "position_id",
        "user_id",
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
        return $this->belongsTo(Position::class, 'position_id');
    }


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function orders()
    {
        $this->hasMany(Order::class);
    }
}
