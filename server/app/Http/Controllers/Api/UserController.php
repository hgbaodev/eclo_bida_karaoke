<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Interface\RoleRepositoryInterface;
use App\Interface\UserRepositoryInterface;
use Illuminate\Http\Request;

class UserController extends Controller
{

    protected $userRepository;
    protected $roleRepository;

    public function __construct(UserRepositoryInterface $userRepository, RoleRepositoryInterface $roleRepository)
    {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
    }

    public function index(Request $request)
    {
        $data = $this->userRepository->getUsers($request);
        return $this->sentSuccessResponse($data);
    }

    public function show($active)
    {
        $data = $this->userRepository->getUserByActive($active);
        if (!$data) {
            return $this->sentErrorResponse('User not found', 'error', 404);
        }
        return $this->sentSuccessResponse($data);
    }

    public function store(StoreUserRequest $request)
    {
        $validatedData = $request->validated();
        $role = $this->roleRepository->getRoleByActive($validatedData['role']);
        if (!$role) {
            return $this->sentErrorResponse('Role not found', 'error', 404);
        }
        $validatedData['role_id'] = $role->id;
        unset($validatedData['role']);
        return $this->sentSuccessResponse($this->userRepository->create($validatedData));
    }

    public function update(UpdateUserRequest $request, $active)
    {
        $validatedData = $request->validated();
        $user = $this->userRepository->getUserByActive($active);
        if (!$user) {
            return $this->sentErrorResponse('User not found', 'error', 404);
        }
        $role = $this->roleRepository->getRoleByActive($validatedData['role']);
        if (!$role) {
            return $this->sentErrorResponse('Role not found', 'error', 404);
        }
        $validatedData['role_id'] = $role->id;
        unset($validatedData['role']);
        return $this->sentSuccessResponse($this->userRepository->updateUserById($user->id, $validatedData));
    }

    public function destroy($active)
    {
        if (!$this->userRepository->getUserByActive($active)) {
            return $this->sentErrorResponse('User not found', 'error', 404);
        }
        return $this->sentSuccessResponse($this->userRepository->deleteByActive($active));
    }
}