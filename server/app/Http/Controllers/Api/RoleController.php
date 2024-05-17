<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use App\Interface\RoleFunctionalPermissionRepositoryInterface;
use App\Interface\RoleRepositoryInterface;
use App\Interface\UserRepositoryInterface;

class RoleController extends Controller
{

    protected $roleRepository;
    protected $userRepository;
    protected $roleFunctionalPermissionRepository;

    public function __construct(RoleRepositoryInterface $roleRepository, UserRepositoryInterface $userRepository, RoleFunctionalPermissionRepositoryInterface $roleFunctionalPermissionRepository) {
        $this->roleRepository = $roleRepository;
        $this->userRepository = $userRepository;
        $this->roleFunctionalPermissionRepository = $roleFunctionalPermissionRepository;
    }
    
    function index()
    {
        return $this->sentSuccessResponse($this->roleRepository->getAllRoles());
    }

    function show($id) {
        return $this->sentSuccessResponse($this->roleRepository->getRoleById($id));
    }

    function store(StoreRoleRequest $request){
        $validatedData = $request->validated();
        return $this->sentSuccessResponse($this->roleRepository->createRole($validatedData));
    }

    function update(UpdateRoleRequest $request, $id){
        $validatedData = $request->validated();
        if(!$this->roleRepository->getRoleById($id)){
            return $this->sentErrorResponse('Role not found', 'error', 404);
        }
        $this->roleFunctionalPermissionRepository->deleteAllByRoleId($id);
        $this->roleFunctionalPermissionRepository->addRoleFunctionalPermissionByRoleId($id, $validatedData['functionals']);
        return $this->sentSuccessResponse($this->roleRepository->updateRoleById($id, $validatedData));
    }

    function destroy($id){
        if($this->userRepository->getUserByRoleId($id)){
            return $this->sentErrorResponse('Role is in use', 'error', 400);
        }
        if(!$this->roleRepository->getRoleById($id)){
            return $this->sentErrorResponse('Role not found', 'error', 404);
        }
        return $this->sentSuccessResponse($this->roleRepository->deleteRoleById($id));
    }
}