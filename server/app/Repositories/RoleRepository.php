<?php

namespace App\Repositories;

use App\Enums\PermissionEnum;
use App\Interface\RoleRepositoryInterface;
use App\Models\Functional;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class RoleRepository implements RoleRepositoryInterface
{

  public function getRoles($request)
  {
    $all = $request->input('all');
    if ($all) {
      return Role::all();
    }
    $roles = Role::with([
      'roleFunctionalPermissions.functional',
      'roleFunctionalPermissions.permission',
      'users'
    ])->get();

    $rolesData = $roles->map(function ($role) {
      $rolePermissions = [];

      // Tạo mảng các chức năng và khởi tạo mảng rỗng cho permissions
      foreach ($role->roleFunctionalPermissions as $rfp) {
        $functionName = $rfp->functional->name;
        $permissionName = $rfp->permission->name;

        if (!isset($rolePermissions[$functionName])) {
          $rolePermissions[$functionName] = [];
        }

        $rolePermissions[$functionName][] = $permissionName;
      }

      $uniqueFunctionals = Functional::all();
      foreach ($uniqueFunctionals as $functionName) {
        if (!isset($rolePermissions[$functionName['name']])) {
          $rolePermissions[$functionName['name']] = [];
        }
      }

      $users = $role->users->map(function ($user) {
        return [
          'id' => $user->id,
          'first_name' => $user->first_name,
          'last_name' => $user->last_name,
          'email' => $user->email,
          'image' => $user->image,
        ];
      });

      return [
        'id' => $role->id,
        'name' => $role->name,
        'color' => $role->color,
        'functionals' => $rolePermissions,
        'users' => $users,
      ];
    });

    return $rolesData;
  }


  function getRoleById($id)
  {
    return Role::with('users')->find($id);
  }

  function createRole(array $data)
  {
    $role = Role::create($data);
    $role['users'] = [];
    return $role;
  }

  public function updateRoleById($id, array $data)
  {
    $role = Role::find($id);
    $role->update($data);
    return $role;
  }

  public function renameRoleById($id, array $data)
  {
    $role = Role::find($id);
    $role->update($data);
    return $role;
  }

  public function deleteRoleById($id)
  {
    $role = Role::find($id);
    $role->delete();
    return $role;
  }

  public function getRoleByActive($active)
  {
    return Role::where('active', $active)->first();
  }

  public function createAdminRole($role_id)
  {
    $functionalNames = [
      'user',
      'customer',
      'logger',
      'import',
      'product',
      'kitchenorder',
      'supplier',
      'shiftdetail',
      'schedule',
      'dayoff',
      'attendance',
      'shifts',
      'position',
      'salary',
      'staff',
      'role',
      'device',
      'table&room',
      'servicetype',
      'price',
      'statistical',
      'revenue',
      'order'
    ];

    $permissions = [
      PermissionEnum::VIEW,
      PermissionEnum::CREATE,
      PermissionEnum::UPDATE,
      PermissionEnum::DELETE
    ];

    $functionalIds = DB::table('functionals')->whereIn('name', $functionalNames)->pluck('id', 'name');

    $data = [];
    foreach ($functionalNames as $functionalName) {
      foreach ($permissions as $permission) {
        $data[] = [
          'role_id' => $role_id,
          'functional_id' => $functionalIds[$functionalName],
          'permission_id' => $permission
        ];
      }
    }

    DB::table('role_functional_permissions')->insert($data);
  }
}
