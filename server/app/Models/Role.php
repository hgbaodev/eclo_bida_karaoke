<?php

namespace App\Models;

use App\Traits\GeneratesUniqueActive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory, GeneratesUniqueActive;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'color',
        'active'
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

    public function roleFunctionalPermissions()
    {
        return $this->hasMany(RoleFunctionalPermission::class);
    }

    public function functionals()
    {
        return $this->belongsToMany(Functional::class, 'role_functional_permissions')
            ->withPivot('permission_id');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}