<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffRequest;
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
    public function index()
    {
        return $this->sentSuccessResponse($this->staffRepository->getAllStaffs());
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
    public function store(Request $request)
    {
        $validatedDate = $request->validated();
        return $this->sentSuccessResponse($this->staffRepository->createStaff($validatedDate), "Staff is created successfully", 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->sentSuccessResponse($this->staffRepository->getStaffByActive($id));
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
    public function update(StaffRequest $request, $id)
    {
        $validatedDate = $request->validated();
        if (!$this->staffRepository->getStaffByActive($id)) {
            return $this->sentErrorResponse('Staff' . $id . 'is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->staffRepository->updateStaffByActive($id, $validatedDate), "Staff is updated successfully", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (!$this->staffRepository->getStaffByActive($id)) {
            return $this->sentErrorResponse('Staff' . $id . 'is not found', 'error', 404);
        }
        return $this->sentSuccessResponse($this->staffRepository->deleteStaffByActive($id), 'Staff' . $id . 'is deleted successfully', 200);
    }
}
