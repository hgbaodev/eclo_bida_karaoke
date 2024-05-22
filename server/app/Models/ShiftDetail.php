<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShiftDetail extends Model
{
    use HasFactory;
    protected $fillable=[
        "id",
        "shift_id",
        "day_of_week",
        "quantity_of_staff"
    ];
}
