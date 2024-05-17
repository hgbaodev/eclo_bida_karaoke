<?php

namespace App\Repositories;

use App\Interface\RoleRepositoryInterface;
use App\Models\Role;

class RoleRepository implements RoleRepositoryInterface
{
  function getAllRoles()
  {
    return Role::with('users')->get()->toArray();
  }

  function getRoleById($id)
  {
    return Role::with('users')->find($id);
  }

  function createRole(array $data)
  {
    return Role::create($data);
  }

  public function updateRoleById($id, array $data){
    $role = Role::find($id);
    $role->update($data);
    return $role;
  }

  public function deleteRoleById($id){
    $role = Role::find($id);
    $role->delete();
    return $role;
  }
}