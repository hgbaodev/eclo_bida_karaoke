<?php

namespace App\Repositories;

use App\Interface\RoleFunctionalPermissionRepositoryInterface;
use App\Models\Functional;
use App\Models\Permission;
use App\Models\RoleFunctionalPermission;

class RoleFunctionalPermissionRepository implements RoleFunctionalPermissionRepositoryInterface
{
  public function deleteAllByRoleId($id){
    return RoleFunctionalPermission::where('role_id', $id)->delete();
  }

  public function addRoleFunctionalPermissionByRoleId($id,$data){
    foreach ($data as $functionalName => $permissions) {
      foreach ($permissions as $permissionName) {
          RoleFunctionalPermission::create([
              'role_id' => $id,
              'functional_id' => Functional::where('name', $functionalName)->first()->id,
              'permission_id' => Permission::where('name', $permissionName)->first()->id
          ]);
      }
    }
  }
}