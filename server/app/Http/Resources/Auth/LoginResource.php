<?php

namespace App\Http\Resources\Auth;

use App\Models\Functional;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Resources\Json\JsonResource;

class LoginResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $role = Role::with(['roleFunctionalPermissions'])->find($this->resource->role);
        $rolePermissions = [];
        foreach ($role->roleFunctionalPermissions as $rfp) {
            $functionName = Functional::find($rfp->functional_id)->name;
            $permissionName = Permission::find($rfp->permission_id)->name;
            
            if (!isset($rolePermissions[$functionName])) {
                $rolePermissions[$functionName] = [];
            }
            
            $rolePermissions[$functionName][] = $permissionName;
        }

        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'accessToken' => $this->accessToken,
            'role' => $role,
            'role' => [
                'name' => $role->name,
                'permissions' => $rolePermissions,
            ],
        ];
    }
}
