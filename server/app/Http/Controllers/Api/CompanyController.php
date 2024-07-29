<?php

namespace App\Http\Controllers\Api;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Companies\StoreCompanyRequest;
use App\Interface\BranchRepositoryInterface;
use App\Interface\CompanyRepositoryInterface;
use App\Interface\RoleRepositoryInterface;
use App\Interface\UserBranchRepositoryInterface;
use App\Interface\UserRepositoryInterface;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    protected $companyRepository;
    protected $userRepository;
    protected $branchRepository;
    protected $userBranchRepository;
    protected $roleRepository;

    public function __construct(CompanyRepositoryInterface $companyRepository, UserRepositoryInterface $userRepository, BranchRepositoryInterface $branchRepository, UserBranchRepositoryInterface $userBranchRepository, RoleRepositoryInterface  $roleRepository)
    {
        $this->companyRepository = $companyRepository;
        $this->userRepository = $userRepository;
        $this->branchRepository = $branchRepository;
        $this->userBranchRepository = $userBranchRepository;
        $this->roleRepository = $roleRepository;
    }

    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->companyRepository->getCompanies($request));
    }

    public function store(StoreCompanyRequest $request)
    {
        $validated_data = $request->validated();
        $company = $this->companyRepository->createCompany($validated_data);
        $branch = $this->branchRepository->createBranch([
            'name' => 'Chi nhánh chính',
            'company_id' => $company->id
        ]);
        $roleAdminNewBranch = $this->roleRepository->createRole([
            'name' => 'Admin',
            'color' => 'rgba(23, 13, 102, 1)',
            'branch_id' => $branch->id
        ]);
        $this->roleRepository->createAdminRole($roleAdminNewBranch->id);
        $validated_data['role_id'] = $roleAdminNewBranch->id;
        $validated_data['company_id'] = $company->id;
        $user = $this->userRepository->create($validated_data);
        $this->userBranchRepository->createUserBranch([
            'user_id' => $user->id,
            'branch_id' => $branch->id
        ]);
        return $this->sentSuccessResponse($company, 'The company has been created', 200);
    }

    public function destroy($active)
    {
        $company = $this->companyRepository->getCompanyByActive($active);
        $company->delete();
        return $this->sentSuccessResponse($company, 'The company has been deleted', 200);
    }
}
