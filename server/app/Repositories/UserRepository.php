<?php

namespace App\Repositories;

use App\Interface\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{

  public function getAll() {
    return User::all();
  }
  
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

  public function getUserByRoleId($id){
    return User::where('role_id', $id)->first();
  }

  public function findById($id)
  {
    return User::find($id);
  }

  public function updateUserById($id, array $data){
    $user = User::find($id);
    $user->update($data);
    return $user;
  }

  public function deleteById($id){
    $user = User::find($id);
    $user->delete();
    return $user;
  }
}