<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\GeneratesUniqueActive;
use Illuminate\Notifications\Notifiable;

class   Product extends Model
{
    public $timestamps = false;
    use HasFactory, GeneratesUniqueActive, Notifiable;
    use SoftDeletes;
    protected $fillable = [
        'name',
        'description',
        'cost_price',
        'selling_price',
        'active',
        'unit',
        'quantity',
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
    public function productimport()
    {
        return $this->hasMany(ProductImpDetail::class);
    }
}
