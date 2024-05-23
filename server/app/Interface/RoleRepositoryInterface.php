<?php

namespace App\Interface;

interface RoleRepositoryInterface
{
    public function getRoles($request);
    public function getRoleById($id);
    public function createRole(array $data);
    public function updateRoleById($id, array $data);
    public function deleteRoleById($id);
    public function getRoleByActive($active);
}