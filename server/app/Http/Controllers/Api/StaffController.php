<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\StaffRequest;
use App\Http\Requests\Staff\UpdateStaffRequest;
use App\Interface\PositionRepositoryInterface;
use App\Models\Staff;
use App\Interface\StaffRepositoryInterface;
use App\Models\Logger;
use Illuminate\Http\Request;
use Laravel\Reverb\Loggers\Log;
use Psy\Readline\Hoa\Console;

class StaffController extends Controller
{
    protected $staffRepository;
    protected $positionRepository;
    public function __construct(StaffRepositoryInterface $staffRepositoryInterface, PositionRepositoryInterface $positionRepositoryInterface)
    {
        $this->staffRepository = $staffRepositoryInterface;
        $this->positionRepository = $positionRepositoryInterface;
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
        $validatedData = $request->validated();
        $positon = $this->positionRepository->getPositionByActive($validatedData['position']);
        if (!$positon) {
            return $this->sentErrorResponse("Position is not found", "error", 404);
        }
        $validatedData["position_id"] = $positon->id;
        unset($validatedData['position']);
        return $this->sentSuccessResponse($this->staffRepository->createStaff($validatedData), "Staff is created successfully", 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($active)
    {
        $data = $this->staffRepository->getStaffByActive($active);
        if (!$data) {
            return $this->sentErrorResponse("Staff is not found", "error", 404);
        }
        return $this->sentSuccessResponse($data);
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
    public function update(UpdateStaffRequest $request, $active)
    {
        $validatedData = $request->validated();

        $staff = $this->staffRepository->getStaffByActive($active);

        if (!$staff) {
            return $this->sentErrorResponse('Staff is not found', "error", 404);
        }
        $position = $this->positionRepository->getPositionByActive($validatedData['position']);
        if (!$position) {
            return $this->sentErrorResponse("Position is not found", "error", 404);
        }
        $validatedData["position_id"] = $position->id;
        unset($validatedData['position']);
        return $this->sentSuccessResponse($this->staffRepository->updateStaffByActive($active, $validatedData), "Staff is updated successfully", 200);
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
