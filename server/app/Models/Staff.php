<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;
    protected $fillable = [
        "staff_name",
        "staff_birthday",
        "staff_image",
        "staff_phone",
        "staff_idcard",
        "staff_address",
        // "user_id",
        "position_id"
        // "staff_salary",
    ];
}
