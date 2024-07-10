<?php

namespace App\Http\Resources\Auth;

use App\Models\Role;
use Illuminate\Http\Resources\Json\JsonResource;

class SigninResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $role = Role::with(['roleFunctionalPermissions.functional', 'roleFunctionalPermissions.permission'])
            ->find($this->resource->role_id);

        $rolePermissions = [];
        foreach ($role->roleFunctionalPermissions as $rfp) {
            $functionName = $rfp->functional->name;
            $permissionName = $rfp->permission->name;
            $rolePermissions[] = $functionName . '.' . $permissionName;
        }

        return [
            'active' => $this->active,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'image' => $this->image,
            'accessToken' => $this->accessToken,
            'role' => [
                'name' => $role->name,
                'permissions' => $rolePermissions,
            ],
        ];
    }
}
