<?php

namespace App\Models;


use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBranch extends Model
{
  use HasFactory, GeneratesUniqueActive;

  public $timestamps = false;

  protected $fillable = [
    'user_id',
    'branch_id'
  ];

  protected $hidden = [];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
  
  public function branch()
  {
    return $this->belongsTo(Branch::class);
  }

  // 
}