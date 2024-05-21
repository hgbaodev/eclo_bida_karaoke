<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{

  public function getAll($request) {
    $all = $request->input('all');
    $perPage = $request->input('perPage');
    $query = $request->input('query');
    $id = $request->input('id');
    $status = $request->input('status');
    $role = $request->input('role');
    $users = User::query()
    ->with(['role']);
    if ($query) {
      $users->where("id", "LIKE", "%$query%")
      ->orWhere("first_name", "LIKE", "%$query%")
      ->orWhere("last_name", "LIKE", "%$query%")
      ->orWhereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%$query%"]);
    }
    if ($id) {
        $users->where('id', $id);
    }
    if($status){
        $users->where('status', $status);
    }
    if($role){
        $users->where('role_id', $role);
    }
    if ($all && $all == true) {
        $users = $users->get();
    } else {
        $users = $users->paginate($perPage ?? 10);
    }
    return new CollectionCustom($users);
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