<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attendance\AttendanceRequest;
use App\Http\Requests\Attendance\UpdateAttendanceRequest;
use App\Interface\AttendanceRepositoryInterface;
use App\Interface\ShiftRepositoryInterface;
use App\Interface\StaffRepositoryInterface;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    protected $attendanceRepository;
    protected $staffRepo;
    protected $shiftRepo;
    public function __construct(AttendanceRepositoryInterface $attendanceRepository, StaffRepositoryInterface $staffRepositoryInterface, ShiftRepositoryInterface $shiftRepositoryInterface)
    {
        $this->attendanceRepository = $attendanceRepository;
        $this->staffRepo = $staffRepositoryInterface;
        $this->shiftRepo = $shiftRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->attendanceRepository->getAttendance($request));
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
    public function store(AttendanceRequest $request)
    {
        $validatedData = $request->validated();
        $shift = $this->shiftRepo->getShiftByActive($validatedData['shift']);
        if (!$shift) {
            return $this->sentErrorResponse("Shift is not found", 'error', 404);
        }
        $staff = $this->staffRepo->getStaffByActive($validatedData['staff']);
        if (!$staff) {
            return $this->sentErrorResponse("Staff is not found", 'error', 404);
        }
        $validatedData['time_in'] = $shift->time_in;
        $validatedData['time_out'] = $shift->time_out;
        $validatedData['staff_id'] = $staff->id;
        unset($validatedData['staff']);
        unset($validatedData['shift']);
        return $this->sentSuccessResponse($this->attendanceRepository->createAttendance($validatedData));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $active)
    {
        if (!$this->attendanceRepository->getAttendanceByActive($active)) {
            return $this->sentErrorResponse('Attendance is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->attendanceRepository->getAttendanceByActive($active));
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
    public function update(UpdateAttendanceRequest $request)
    {
        $validatedData = $request->validated();
        $staff = $this->staffRepo->getStaffByUUID($validatedData['uuid']);
        if (!$staff) {
            return $this->sentErrorResponse("Staff is not found", 'error', 404);
        }
        $attendance = $this->attendanceRepository->getAttendanceByUUIDAndDay($staff->id, $validatedData['day']);
        if (!$attendance) {
            return $this->sentErrorResponse("Staff don't have attendance today", 'error', 404);
        }
        $time = $validatedData['time'];
        $update = $validatedData['update'];
        if (!$update) {
            if (!$attendance->check_in) {
                $validatedData['check_in'] = $time;
            } else if (!$attendance->check_out) {
                $validatedData['check_out'] = $time;
            } else {
                return $this->sentErrorResponse("This staff is already attendanced", 'error', 404);
            }
        }
        unset($validatedData['time']);
        unset($validatedData['update']);
        return $this->sentSuccessResponse($this->attendanceRepository->updateAttendanceByActive($attendance->active, $validatedData), "Attendance is updated successfully", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uuid, string $day)
    {
        $staff = $this->staffRepo->getStaffByUUID($uuid);
        $attendance = $this->attendanceRepository->getAttendanceByUUIDAndDay($staff->id, $day);
        return $this->sentSuccessResponse($this->attendanceRepository->deleteAttendanceByActive($attendance->active), "Shift is deleted successfully", 200);
    }
}
