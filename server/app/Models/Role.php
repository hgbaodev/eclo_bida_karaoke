<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'color'
    ];

    public function roleFunctionalPermissions()
    {
        return $this->hasMany(RoleFunctionalPermission::class);
    }

    public function functionals()
    {
        return $this->belongsToMany(Functional::class, 'role_functional_permissions')
                    ->withPivot('permission_id');
    }

    public function users(){
        return $this->hasMany(User::class);
    }

}