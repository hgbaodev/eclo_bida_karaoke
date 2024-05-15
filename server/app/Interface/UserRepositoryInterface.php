<?php 

namespace App\Interface;

use App\Models\User;

interface UserRepositoryInterface {
    public function create(array $data);
    public function findByEmail(string $email);
    public function save(User $user);
}
