<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDeviceDetail extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'device_id',
        'quantity'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function device()
    {
        return $this->belongsTo(Device::class);
    }
}
