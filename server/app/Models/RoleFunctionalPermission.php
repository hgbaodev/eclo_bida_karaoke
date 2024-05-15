<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleFunctionalPermission extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'role_id',
        'function_id',
        'permission_id',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function functional()
    {
        return $this->belongsTo(Functional::class);
    }

    public function permission()
    {
        return $this->belongsTo(Permission::class);
    }
}
