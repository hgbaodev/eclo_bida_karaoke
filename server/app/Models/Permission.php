<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    public function roleFunctionPermissions()
    {
        return $this->hasMany(RoleFunctionalPermission::class);
    }

    public function functionals()
    {
        return $this->belongsToMany(Functional::class, 'role_functional_permission')
                    ->withPivot('role_id');
    }
}
