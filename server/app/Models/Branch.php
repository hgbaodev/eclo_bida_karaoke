<?php

namespace App\Models;


use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
  use HasFactory, GeneratesUniqueActive;

  public $timestamps = false;

  protected $fillable = [
    'id',
    'active',
    'name',
    'company_id',
  ];

  protected $hidden = [
    'company_id'
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

  public function company()
  {
    return $this->belongsTo(Company::class);
  }
}
