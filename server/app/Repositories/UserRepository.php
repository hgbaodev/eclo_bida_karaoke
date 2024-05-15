<?php

namespace App\Repositories;

use App\Interface\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
  public function create(array $data) {
    return User::create($data);
  }

  public function findByEmail(string $email) {
      return User::where('email', $email)->first();
  }

  public function save(User $user) {
      $user->save();
      return $user;
  } 
}
