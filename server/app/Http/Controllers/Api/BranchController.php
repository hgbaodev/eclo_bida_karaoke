<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Branch\BranchRequest;
use App\Http\Requests\Branch\UpdateBranchRequest;
use App\Interface\BranchRepositoryInterface;
use App\Interface\CompanyRepositoryInterface;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $branchRepository;
    protected $companyRepository;
    public function __construct(BranchRepositoryInterface $branchRepositoryInterface, CompanyRepositoryInterface $companyRepositoryInterface)
    {
        $this->branchRepository = $branchRepositoryInterface;
        $this->companyRepository = $companyRepositoryInterface;
    }
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->branchRepository->getBranches($request));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BranchRequest $request)
    {
        $validateData = $request->validated();
        $company = $this->companyRepository->getCompanyByActive($validateData["company"]);
        if (!$company) {
            return $this->sentErrorResponse("Company is not found", "error", 404);
        }
        $validateData["company_id"] = $company->id;
        unset($validateData['company']);
        return $this->sentSuccessResponse($this->branchRepository->createBranch($validateData));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBranchRequest $request, string $active)
    {
        $validateData = $request->validated();
        $branch = $this->branchRepository->getBranchByActive($active);
        if (!$branch) {
            return $this->sentErrorResponse("Branch is not found", "error", 404);
        }
        $company = $this->companyRepository->getCompanyByActive($validateData["company"]);
        if (!$company) {
            return $this->sentErrorResponse("Company is not found", "error", 404);
        }
        $validateData["company_id"] = $company->id;
        unset($validateData['company']);
        return $this->sentSuccessResponse($this->branchRepository->updateBranch($active, $validateData));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $active)
    {
        if (!$this->branchRepository->getBranchByActive($active)) {
            return $this->sentErrorResponse("Branch is not found", "error", 404);
        }
        return $this->sentSuccessResponse($this->branchRepository->deleteBranch($active));
    }
}
