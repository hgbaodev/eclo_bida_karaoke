<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Functional extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    public function roleFunctionalPermissions()
    {
        return $this->hasMany(RoleFunctionalPermission::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_functional_permission')
                    ->withPivot('permission_id');
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_functional_permission')
                    ->withPivot('role_id');
    }
}
