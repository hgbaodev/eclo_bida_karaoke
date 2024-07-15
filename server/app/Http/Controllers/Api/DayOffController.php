<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DayOff\DayOffRequest;
use App\Interface\AttendanceRepositoryInterface;
use App\Interface\DayOffRepositoryInterface;
use App\Interface\SalaryRepositoryInterface;
use App\Interface\StaffRepositoryInterface;;

use Illuminate\Http\Request;

class DayOffController extends Controller
{
    protected $dayOffRepository;
    protected $staffRes;
    protected $salaryRepo;
    protected $attendanceRepo;
    public function __construct(DayOffRepositoryInterface $dayOffRepository, StaffRepositoryInterface $staffRepositoryInterface, SalaryRepositoryInterface $salaryRepositoryInterface, AttendanceRepositoryInterface $attendanceRepositoryInterface)
    {
        $this->dayOffRepository = $dayOffRepository;
        $this->staffRes = $staffRepositoryInterface;
        $this->salaryRepo = $salaryRepositoryInterface;
        $this->attendanceRepo = $attendanceRepositoryInterface;
    }

    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->dayOffRepository->getDayOffs($request));
    }

    public function store(DayOffRequest $request)
    {
        $validated_data = $request->validated();
        $type = $request->input("type");
        $staff = $this->staffRes->getStaffByActive($validated_data["staff"]);
        $day_off = $validated_data['day_off'];
        $attendance = $this->attendanceRepo->getAttendanceByUUIDAndDay($staff->id, $day_off);
        if (!$attendance) {
            return $this->sentErrorResponse("Staff don't have shift in " . $day_off, 'error', 404);
        }
        $reason = $request->input("reason");
        if ($type == "D" && $reason != "") {
            return $this->sentErrorResponse("Unapproved has no reason", "error", 404);
        }
        if (!$staff) {
            return $this->sentErrorResponse("Staff is not found", "error", 404);
        }
        $day_offs = $this->dayOffRepository->getDayOffByStaffAndDay($staff->id, $day_off);
        if ($day_offs) {
            return $this->sentErrorResponse("Already request in " . $day_off, "error", 404);
        }
        $validated_data["staff_id"] = $staff->id;
        unset($validated_data['staff']);
        $device = $this->dayOffRepository->create($validated_data);
        $month = date('m', strtotime($day_off));
        $year = date('Y', strtotime($day_off));
        $salary = $this->salaryRepo->getSalaryByStaffAndDate($staff->id, $month, $year);
        $count = $this->dayOffRepository->countDayOffByStaff($staff->id, $month, $year);
        $updateSalary = [
            "off_days" => $count
        ];
        $this->salaryRepo->updateSalaryByActive($salary->active, $updateSalary);
        return $this->sentSuccessResponse($device, 'create successfully !!!', 200);
    }

    public function show($id)
    {
        return $this->sentSuccessResponse($this->dayOffRepository->getDayOffByActive($id));
    }

    public function update(DayOffRequest $request, string $active)
    {
        $validated_data = $request->validated();
        if (!$this->dayOffRepository->getDayOffByActive($active)) {
            return $this->sentErrorResponse('Not found day off');
        }

        return $this->sentSuccessResponse($this->dayOffRepository->updateDayOffByActive($active, $validated_data),  ' day off has been updated!!!', 200);
    }

    public function destroy(string $active)
    {
        $day_off = $this->dayOffRepository->getDayOffByActive($active);
        if (!$day_off) {
            return $this->sentErrorResponse('Not found day off');
        }
        $attendance = $this->attendanceRepo->getAttendanceByUUIDAndDay($day_off->staff_id, $day_off);
        $updateAttendance = [
            "type" => ""
        ];
        $this->attendanceRepo->updateAttendanceByActive($attendance->active, $updateAttendance);
        return $this->sentSuccessResponse($this->dayOffRepository->deleteByActive($active), ' day off has been deleted!!!', 200);
    }
}
