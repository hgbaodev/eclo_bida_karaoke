<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Companies\StoreCompanyRequest;
use App\Interface\CompanyRepositoryInterface;
use App\Interface\UserRepositoryInterface;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    protected $companyRepository;
    protected $userRepository;

    public function __construct(CompanyRepositoryInterface $companyRepository, UserRepositoryInterface $userRepository)
    {
        $this->companyRepository = $companyRepository;
        $this->userRepository = $userRepository;
    }

    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->companyRepository->getCompanies($request));
    }

    public function store(StoreCompanyRequest $request)
    {
        $validated_data = $request->validated();
        $company = $this->companyRepository->createCompany($validated_data);
        $validated_data['role_id'] = 1;
        $validated_data['company_id'] = $company->id;
        $this->userRepository->create($validated_data);
        return $this->sentSuccessResponse($company, 'The company has been created', 200);
    }

    public function destroy($active)
    {
        $company = $this->companyRepository->getCompanyByActive($active);
        $company->delete();
        return $this->sentSuccessResponse($company, 'The company has been deleted', 200);
    }
}
