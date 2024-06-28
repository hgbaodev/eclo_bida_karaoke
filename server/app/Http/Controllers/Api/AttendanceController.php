<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attendance\AttendanceRequest;
use App\Http\Requests\Attendance\UpdateAttendanceRequest;
use App\Interface\AttendanceRepositoryInterface;
use App\Interface\StaffRepositoryInterface;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    protected $attendanceRepository;
    protected $staffRepo;
    public function __construct(AttendanceRepositoryInterface $attendanceRepository, StaffRepositoryInterface $staffRepositoryInterface)
    {
        $this->attendanceRepository = $attendanceRepository;
        $this->staffRepo = $staffRepositoryInterface;
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
    public function store(UpdateAttendanceRequest $request)
    {
        $validatedData = $request->validated();
        $staff = $this->staffRepo->getStaffByActive($validatedData['staff']);
        if (!$staff) {
            return $this->sentErrorResponse("Staff is not found", 'error', 404);
        }
        $validatedData['staff_id'] = $staff->id;
        unset($validatedData['staff']);
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
    public function update(AttendanceRequest $request)
    {
        $validatedData = $request->validated();
        $staff = $this->staffRepo->getStaffByUUID($validatedData['uuid']);
        if (!$staff) {
            return $this->sentErrorResponse("Staff is not found", 'error', 404);
        }
        $attendance = $this->attendanceRepository->getAttendanceByUUIDAndDay($staff->id, $validatedData['day']);
        if (!$attendance) {
            return $this->sentErrorResponse("Attendance is not found", 'error', 404);
        }
        $time = $validatedData['time'];
        if (!$attendance->time_in) {
            $validatedData['time_in'] = $time;
            unset($validatedData['time']);
        } else if (!$attendance->time_out) {
            $validatedData['time_out'] = $time;
            unset($validatedData['time']);
        } else {
            return $this->sentErrorResponse("This staff is already attendanced", 'error', 404);
        }
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
