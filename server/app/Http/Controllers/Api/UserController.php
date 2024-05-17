<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Interface\UserRepositoryInterface;

class UserController extends Controller
{
    
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository) {
        $this->userRepository = $userRepository;
    }
    
    public function index()
    {
        $data = $this->userRepository->getAll();
        return $this->sentSuccessResponse($data);
    }

    public function show($id)
    {
        $data = $this->userRepository->findById($id);
        return $this->sentSuccessResponse($data);
    }

    public function store(StoreUserRequest $request)
    {
        $validatedData = $request->validated();
        return $this->sentSuccessResponse($this->userRepository->create($validatedData));
    }

    public function update(UpdateUserRequest $request,$id)
    {
        $validatedData = $request->validated();
        if(!$this->userRepository->findById($id)){
            return $this->sentErrorResponse('User not found', 'error', 404);
        }
        return $this->sentSuccessResponse($this->userRepository->updateUserById($id, $validatedData));
    }

    public function destroy($id)
    {
        if(!$this->userRepository->findById($id)){
            return $this->sentErrorResponse('User not found', 'error', 404);
        }
        return $this->sentSuccessResponse($this->userRepository->deleteById($id));
    }
}