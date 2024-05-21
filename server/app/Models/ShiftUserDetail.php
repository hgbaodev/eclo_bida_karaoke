<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShiftUserDetail extends Model
{
    use HasFactory;
    protected $fillable=[
        "staff_id",
        "shift_detail_id"
    ];
}
