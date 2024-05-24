<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\StaffRequest;
use App\Models\Staff;
use App\Interface\StaffRepositoryInterface;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    protected $staffRepository;
    public function __construct(StaffRepositoryInterface $staffRepositoryInterface)
    {
        $this->staffRepository = $staffRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->staffRepository->getStaffs($request));
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
    public function store(StaffRequest $request)
    {
        $validatedDate = $request->validated();
        return $this->sentSuccessResponse($this->staffRepository->createStaff($validatedDate), "Staff is created successfully", 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($active)
    {
        return $this->sentSuccessResponse($this->staffRepository->getStaffByActive($active));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Staff $staff)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StaffRequest $request, $active)
    {
        $validatedDate = $request->validated();
        if (!$this->staffRepository->getStaffByActive($active)) {
            return $this->sentErrorResponse('Staff is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->staffRepository->updateStaffByActive($active, $validatedDate), "Staff is updated successfully", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($active)
    {
        if (!$this->staffRepository->getStaffByActive($active)) {
            return $this->sentErrorResponse('Staff is not found', 'error', 404);
        }
        return $this->sentSuccessResponse($this->staffRepository->deleteStaffByActive($active), 'Staff is deleted successfully', 200);
    }
}
