<?php 

namespace App\Interface;

interface RoleRepositoryInterface {
    public function getAllRoles();
    public function getRoleById($id);
    public function createRole(array $data);
    public function updateRoleById($id, array $data);
    public function deleteRoleById($id);
}