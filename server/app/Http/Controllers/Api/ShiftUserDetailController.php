<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShiftUserDetail\CreateSUDByWorkShiftRequest;
use App\Http\Requests\ShiftUserDetail\ShiftUserDetailRequest;
use App\Interface\ShiftRepositoryInterface;
use App\Interface\ShiftUserDetailRepositoryInterface;
use App\Interface\StaffRepositoryInterface;
use App\Interface\WorkShiftRepositoryInterface;
use Illuminate\Http\Request;

class ShiftUserDetailController extends Controller
{
    protected $shiftUserDetailRes;
    protected $staffRes;
    protected $shiftRes;
    protected $workshiftRes;
    public function __construct(ShiftUserDetailRepositoryInterface $shiftUserDetailRepositoryInterface, StaffRepositoryInterface $staffRepositoryInterface, ShiftRepositoryInterface $shiftRepositoryInterface, WorkShiftRepositoryInterface $workShiftRepositoryInterface)
    {
        $this->staffRes = $staffRepositoryInterface;
        $this->shiftUserDetailRes = $shiftUserDetailRepositoryInterface;
        $this->shiftRes = $shiftRepositoryInterface;
        $this->workshiftRes = $workShiftRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->shiftUserDetailRes->getShiftUserDetail($request));
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
        $workshift = $this->workshiftRes->getWorkShiftByActive($validateData["workshift"]);
        if (!$workshift) {
            return $this->sentErrorResponse("Work Shift is not found", "error", 404);
        }
        $shiftuserdetail = $this->shiftUserDetailRes->checkUniqueByStaffDay($staff->id, $validateData["day_of_week"], $workshift->id);
        if ($shiftuserdetail->isNotEmpty()) {
            return $this->sentErrorResponse("This staff already have one shift in this day", "error", 404);
        }
        $validateData["workshift_id"] = $workshift->id;
        $validateData["staff_id"] = $staff->id;
        $validateData["shift_id"] = $shift->id;
        unset($validateData['workshift']);
        unset($validateData['shift']);
        unset($validateData['staff']);
        return $this->sentSuccessResponse($this->shiftUserDetailRes->createShiftUserDetail($validateData), "Created successfully", 200);
    }
    public function storeByWorkShift(CreateSUDByWorkShiftRequest $request)
    {
        $validateData = $request->validated();
        foreach ($validateData['detail'] as $item) {
            $staff = $this->staffRes->getStaffByActive($item["staff"]);
            if (!$staff) {
                return $this->sentErrorResponse("Staff is not found", "error", 404);
            }
            $shift = $this->shiftRes->getShiftByActive($item["shift"]);
            if (!$shift) {
                return $this->sentErrorResponse("Shift is not found", "error", 404);
            }
            $workshift = $this->workshiftRes->getWorkShiftByActive($item["workshift"]);
            if (!$workshift) {
                return $this->sentErrorResponse("Work Shift is not found", "error", 404);
            }
            $shiftuserdetail = $this->shiftUserDetailRes->checkUniqueByStaffDay($staff->id, $item["day_of_week"], $workshift->id);
            if ($shiftuserdetail->isNotEmpty()) {
                return $this->sentErrorResponse("This staff already have one shift in this day", "error", 404);
            }
            $shiftuserdetails = [
                'staff_id' => $staff->id,
                'workshift_id' => $workshift->id,
                'shift_id' => $shift->id,
                'day_of_week' => $item["day_of_week"],
            ];
            $this->shiftUserDetailRes->createShiftUserDetail($shiftuserdetails);
        }
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
        return $this->sentSuccessResponse($this->shiftUserDetailRes->deleteShiftUserDetailByActive($active), "Deleted successfully!", 200);
    }
}
