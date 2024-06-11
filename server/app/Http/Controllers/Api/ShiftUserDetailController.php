<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShiftUserDetail\ShiftUserDetailRequest;
use App\Interface\ShiftRepositoryInterface;
use App\Interface\ShiftUserDetailRepositoryInterface;
use App\Interface\StaffRepositoryInterface;
use Illuminate\Http\Request;

class ShiftUserDetailController extends Controller
{
    protected $shiftUserDetailRes;
    protected $staffRes;
    protected $shiftRes;
    public function __construct(ShiftUserDetailRepositoryInterface $shiftUserDetailRepositoryInterface, StaffRepositoryInterface $staffRepositoryInterface, ShiftRepositoryInterface $shiftRepositoryInterface)
    {
        $this->staffRes = $staffRepositoryInterface;
        $this->shiftUserDetailRes = $shiftUserDetailRepositoryInterface;
        $this->shiftRes = $shiftRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->sentSuccessResponse($this->shiftUserDetailRes->getAllShiftUserDetail());
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
    public function store(ShiftUserDetailRequest $request)
    {
        $validateData = $request->validated();
        $staff = $this->staffRes->getStaffByActive($validateData["staff"]);
        if (!$staff) {
            return $this->sentErrorResponse("Staff is not found", "error", 404);
        }
        $shift = $this->shiftRes->getShiftByActive($validateData["shift"]);
        if (!$shift) {
            return $this->sentErrorResponse("Shift is not found", "error", 404);
        }
        $validateData["staff_id"] = $staff->id;
        $validateData["shift_id"] = $shift->id;
        unset($validateData['shift']);
        unset($validateData['staff']);
        return $this->sentSuccessResponse($this->shiftUserDetailRes->createShiftUserDetail($validateData), "Created successfully", 200);
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
    public function update(ShiftUserDetailRequest $request, string $active)
    {
        $validateData = $request->validated();
        $shiftuserdetail = $this->shiftUserDetailRes->getShiftUserDetailByActive($active);
        if (!$shiftuserdetail) {
            return $this->sentErrorResponse("Shift User Detail is not found", "error", 404);
        }
        return $this->sentSuccessResponse($this->shiftUserDetailRes->updateShiftUserDetailByActive($active, $validateData), "Updated successfully!", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $active)
    {
        $shiftUserDetail = $this->shiftUserDetailRes->getShiftUserDetailByActive($active);
        if (!$shiftUserDetail) {
            return $this->sentErrorResponse("Shift User Detail is not found", "error", 404);
        }
        return $this->sentSuccessResponse($shiftUserDetail, "Deleted successfully!", 200);
    }
}
