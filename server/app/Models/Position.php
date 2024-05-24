<?php

namespace App\Models;

use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Position extends Model
{
    use HasFactory, GeneratesUniqueActive;
    use SoftDeletes;
    protected $fillable = [
        "name",
        "salary"
    ];
    protected $hidden = [
        "id"
    ];
    public function staff()
    {
        return $this->belongsTo(Staff::class);
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
