<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Company\CompanyRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
use App\Interface\CompanyRepositoryInterface;
use Illuminate\Http\Request;

class CompanyController extends Controller
{

    protected $companyRepository;
    public function __construct(CompanyRepositoryInterface $companyRepository)
    {
        $this->companyRepository = $companyRepository;
    }

    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->companyRepository->getCompany($request));
    }

    public function store(CompanyRequest $request)
    {
        $validated_data = $request->validated();

        $company = $this->companyRepository->createCompany($validated_data);
        return $this->sentSuccessResponse($company, 'The company has been created!!!', 200);
    }

    public function show($active)
    {
        return $this->sentSuccessResponse($this->companyRepository->getCompanyByActive($active));
    }

    public function update(UpdateCompanyRequest $request, string $active)
    {
        $validated_data = $request->validated();
        if (!$this->companyRepository->getCompanyByActive($active)) {
            return $this->sentErrorResponse('Company ' . $active . ' is not found');
        }
        return $this->sentSuccessResponse($this->companyRepository->updateCompanyByActive($active, $validated_data), 'The company ' . $active . ' has been updated!!!', 200);
    }

    public function destroy(string $active)
    {
        if (!$this->companyRepository->getCompanyByActive($active)) {
            return $this->sentErrorResponse('Company ' . $active . ' is not found');
        }
        return $this->sentSuccessResponse($this->companyRepository->deleteCompanyByActive($active), 'The device ' . $active . ' has been deleted!!!', 200);
    }
}