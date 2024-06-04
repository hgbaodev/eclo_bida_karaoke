<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{

  public function getUsers($request)
  {
    $all = $request->input('all');
    $perPage = $request->input('perPage');
    $query = $request->input('query');
    $id = $request->input('id');
    $status = $request->input('status');
    $role = $request->input('role');
    $users = User::query()
      ->with(['role']);
    if ($query) {
      $users->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%$query%"]);
    }
    if ($id) {
      $users->where('active', $id);
    }
    if ($status) {
      $users->where('status', $status);
    }
    if ($role) {
      $users->whereHas('role', function ($query) use ($role) {
        $query->where('active', $role);
      });
    }
    $users->orderBy('id', 'desc');
    if ($all && $all == true) {
      $users = $users->get();
    } else {
      $users = $users->paginate($perPage ?? 10);
    }
    return new CollectionCustom($users);
  }

  public function create(array $data)
  {
    return User::create($data);
  }

  public function findByEmail(string $email)
  {
    return User::where('email', $email)->first();
  }

  public function save(User $user)
  {
    $user->save();
    return $user;
  }

  public function getUserByRoleId($id)
  {
    return User::where('role_id', $id)->first();
  }

  public function findById($id)
  {
    return User::find($id);
  }

  public function updateUserById($id, array $data)
  {
    $user = User::find($id);
    $user->update($data);
    return $user;
  }

  public function deleteById($id)
  {
    $user = User::find($id);
    $user->delete();
    return $user;
  }

  public function getUserByActive($active)
  {
    return User::where('active', $active)->first();
  }

  public function deleteByActive($active)
  {
    $user = User::where('active', $active)->first();
    $user->delete();
    return $user;
  }
}
