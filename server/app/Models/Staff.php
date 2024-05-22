<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "birthday",
        "image",
        "phone",
        "idcard",
        "address",
        // "user_id",
        "position_id"
        // "staff_salary",
    ];
    public function position(){
        return $this->hasOne(Position::class);
    }
}
