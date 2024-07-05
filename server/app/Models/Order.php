<?php

namespace App\Models;

use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Order extends Model
{
    use HasFactory, SoftDeletes, GeneratesUniqueActive, Notifiable;

    public $timestamps = true;

    protected $fillable = [
        'active',
        'status',
        'checkin_time',
        'checkout_time',
        'total_price',
        'customer_id',
        'user_id',
        'service_id',
    ];

    protected $hidden = [
        'deleted_at',
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

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function customer()
    {
        return $this->hasOne(Customer::class, 'id', 'customer_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderdetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function orderdevicedetails()
    {
        return $this->hasMany(OrderDeviceDetail::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_details')->withPivot('quantity');
    }

    public function kitchenOrders()
    {
        return $this->hasMany(KitchenOrder::class);
    }

    public function getActiveAttribute()
    {
        return Arr::get($this->attributes, 'active', null);
    }
}
