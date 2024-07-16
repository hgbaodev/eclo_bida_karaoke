<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attendance\AttendanceByWSRequest;
use App\Http\Requests\Attendance\AttendanceRequest;
use App\Http\Requests\Attendance\UpdateAttendanceRequest;
use App\Interface\AttendanceRepositoryInterface;
use App\Interface\SalaryRepositoryInterface;
use App\Interface\ShiftRepositoryInterface;
use App\Interface\StaffRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AttendanceController extends Controller
{
    protected $attendanceRepository;
    protected $staffRepo;
    protected $shiftRepo;
    protected $salaryRepo;
    public function __construct(AttendanceRepositoryInterface $attendanceRepository, StaffRepositoryInterface $staffRepositoryInterface, ShiftRepositoryInterface $shiftRepositoryInterface, SalaryRepositoryInterface $salaryRepositoryInterface)
    {
        $this->attendanceRepository = $attendanceRepository;
        $this->staffRepo = $staffRepositoryInterface;
        $this->shiftRepo = $shiftRepositoryInterface;
        $this->salaryRepo = $salaryRepositoryInterface;
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
    public function storeByWorkShift(AttendanceByWSRequest $request)
    {
        $validatedData = $request->validated();
        foreach ($validatedData['detail'] as $item) {
            $shift = $this->shiftRepo->getShiftByActive($item['shift']);
            if (!$shift) {
                return $this->sentErrorResponse("Shift is not found", 'error', 404);
            }
            $staff = $this->staffRepo->getStaffByActive($item['staff']);
            if (!$staff) {
                return $this->sentErrorResponse("Staff is not found", 'error', 404);
            }
            $attendance = [
                'day' => $item['day'],
                'staff_id' => $staff->id,
                'time_in' => $shift->time_in,
                'time_out' => $shift->time_out
            ];
            $this->attendanceRepository->createAttendance($attendance);
        }
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
        $staff = $this->staffRepo->getStaffByActive($validatedData['staff']);
        if (!$staff) {
            return $this->sentErrorResponse("Staff is not found", 'error', 404);
        }
        $attendance = $this->attendanceRepository->getAttendanceByUUIDAndDay($staff->id, $validatedData['day']);
        if (!$attendance) {
            return $this->sentErrorResponse("Staff don't have attendance today", 'error', 404);
        }
        if ($attendance->type === "Approved" || $attendance->type === "Unapproved") {
            return $this->sentErrorResponse("Staff already request day off", 'error', 404);
        }
        $month = date('m', strtotime($attendance->day));
        $year = date('Y', strtotime($attendance->day));
        $salary = $this->salaryRepo->getSalaryByStaffAndDate($staff->id, $month, $year);
        if (!$salary) {
            return $this->sentErrorResponse("You need create salary for staff", "error", 404);
        }
        $time = $validatedData['time'];
        if (!isset($validatedData['update'])) {
            if (!$attendance->check_in) {
                $validatedData['check_in'] = $time;
                if ($time > $attendance->time_in) {
                    $validatedData['type'] = "in-late";
                }
            } else if (!$attendance->check_out) {
                $validatedData['check_out'] = $time;
                if ($time < $attendance->time_out) {
                    if ($attendance->type) {
                        $validatedData['type'] = $attendance->type . " and out-early";
                    } else {
                        $validatedData['type'] = "out-early";
                    }
                }
            } else {
                return $this->sentErrorResponse("This staff is already attendanced", 'error', 404);
            }
        } else {
            $validatedData['type'] = '';
            $check_in = $validatedData['check_in'];
            $check_out = $validatedData['check_out'];
            // Kiểm tra đi muộn
            if ($check_in > $attendance->time_in && !is_null($check_in)) {
                $validatedData['type'] = 'in late';
            }

            // Kiểm tra về sớm
            if ($check_out < $attendance->time_out && !is_null($check_out)) {
                // Nếu type đã được đặt thành 'in late' trước đó, thì thêm 'out early' vào type
                if ($validatedData['type'] === 'in late') {
                    $validatedData['type'] .= ' and out early';
                } else {
                    // Nếu type chưa được đặt thành 'in late', thì đặt type thành 'out early'
                    $validatedData['type'] = 'out early';
                }
            }
        }
        if (isset($validatedData['day_off'])) {
            if ($validatedData['day_off'])
                $validatedData['type'] = 'Approved';
            else {
                $validatedData['type'] = 'Unapproved';
            }
        }
        $validatedData['staff_id'] = $staff->id;
        unset($validatedData['uuid']);
        unset($validatedData['time']);
        unset($validatedData['update']);
        $updateAtt = $this->attendanceRepository->updateAttendanceByActive($attendance->active, $validatedData);
        $count = $this->attendanceRepository->countAttendanceComplete($staff->id, $month, $year);
        $date = Carbon::create($year, $month, 1);

        $daysInMonth = $date->daysInMonth;
        if ($salary->staff->position->salary_structure === 'Day') {
            $updateSal = [
                'working_days' => $count,
                'total' => $count * $salary->staff->position->base_salary,
            ];
        } else if ($salary->staff->position->salary_structure === 'Hour') {
            $currentDate = Carbon::today();
            $attendances = $this->attendanceRepository->getAttendanceComplete($staff->id, $month, $year);
            $hours = 0;
            foreach ($attendances as $item) {
                $check_in = Carbon::parse($currentDate->toDateString() . ' ' . $item->check_in);
                $check_out = Carbon::parse($currentDate->toDateString() . ' ' . $item->check_out);
                $hours += $check_in->diffInHours($check_out);
            }
            $updateSal = [
                'working_days' => $count,
                'working_hours' => $hours,
                'total' => $hours * $salary->staff->position->base_salary,
            ];
        } else {
            $updateSal = [
                'working_days' => $count,
                'total' => ($salary->staff->position->base_salary / $daysInMonth) * $count,
            ];
        }
        $this->salaryRepo->updateSalaryByActive($salary->active, $updateSal);
        return $this->sentSuccessResponse($updateAtt, "Attendance is updated successfully", 200);
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
