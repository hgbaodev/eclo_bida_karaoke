<?php 

namespace App\Interface;

interface RoleFunctionalPermissionRepositoryInterface {
    public function deleteAllByRoleId($id);
    public function addRoleFunctionalPermissionByRoleId($id,$data);
}