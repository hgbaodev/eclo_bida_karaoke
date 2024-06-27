<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attendance\AttendanceRequest;
use App\Interface\AttendanceRepositoryInterface;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    protected $attendanceRepository;
    public function __construct(AttendanceRepositoryInterface $attendanceRepository)
    {
        $this->attendanceRepository = $attendanceRepository;
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
        return $this->sentSuccessResponse($this->attendanceRepository->createAttendance($validatedData));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $active)
    {
        if (!$this->attendanceRepository->getAttendanceByActive($active)) {
            return $this->sentErrorResponse('Shift is not found', "error", 404);
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
    public function update(AttendanceRequest $request, string $active)
    {
        $validatedData = $request->validated();
        $shift = $this->attendanceRepository->getAttendanceByActive($active);
        if (!$shift) {
            return $this->sentErrorResponse('Shift is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->attendanceRepository->updateAttendanceByActive($active, $validatedData), "Shift is updated successfully", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $active)
    {
        if (!$this->attendanceRepository->getAttendanceByActive($active)) {
            return $this->sentErrorResponse('Shift is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->attendanceRepository->deleteAttendanceByActive($active), "Shift is deleted successfully", 200);
    }
}
