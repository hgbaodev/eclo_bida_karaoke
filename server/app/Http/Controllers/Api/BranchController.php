<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Branch\BranchRequest;
use App\Http\Requests\Branch\UpdateBranchRequest;
use App\Interface\BranchRepositoryInterface;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    protected $branchRepo;
    public function __construct(BranchRepositoryInterface $branchRepositoryInterface)
    {
        $this->branchRepo = $branchRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->branchRepo->getBranch($request));
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
        $validateDate = $request->validated();
        return $this->sentSuccessResponse($this->branchRepo->createBranch($validateDate));
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
        $validateDate = $request->validated();
        $branch = $this->branchRepo->getBranchByActive($active);
        if (!$branch) {
            return $this->sentErrorResponse("Branch is nor found", "error", 404);
        }
        return $this->sentSuccessResponse($this->branchRepo->updateBranchByActive($active, $validateDate));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $active)
    {
        $branch = $this->branchRepo->getBranchByActive($active);
        if (!$branch) {
            return $this->sentErrorResponse("Branch is not found", "error", 404);
        }
        return $this->sentSuccessResponse("Delete success");
    }
}
