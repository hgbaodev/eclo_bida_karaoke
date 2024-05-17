<?php 

namespace App\Interface;

use App\Models\User;

interface UserRepositoryInterface {
    public function getAll();
    public function create(array $data);
    public function findByEmail(string $email);
    public function findById($id);
    public function save(User $user);
    public function getUserByRoleId($id);
    public function updateUserById($id, array $data);
    public function deleteById($id);
}