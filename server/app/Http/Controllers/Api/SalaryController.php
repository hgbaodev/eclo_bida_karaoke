<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Salary\SalaryRequest;
use App\Http\Requests\Salary\UpdateSalaryRequest;
use App\Interface\SalaryRepositoryInterface;
use App\Interface\StaffRepositoryInterface;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    protected $salaryRepo;
    protected $staffRepo;
    public function __construct(SalaryRepositoryInterface $salaryRepositoryInterface, StaffRepositoryInterface $staffRepositoryInterface)
    {
        $this->salaryRepo = $salaryRepositoryInterface;
        $this->staffRepo = $staffRepositoryInterface;
    }
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->salaryRepo->getSalary($request));
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(SalaryRequest $request)
    {
        try {
            $validateData = $request->validated();
            $month = $validateData['month'];
            $year = $validateData['year'];
            if (isset($validateData['staff'])) {
                $staff = $this->staffRepo->getStaffByActive($validateData['staff']);
                if (!$staff) {
                    return $this->sentErrorResponse("Staff is not found", 'error', 404);
                }
                $validateData['staff_id'] = $staff->id;
                $validateData['working_days'] = 0;
                $validateData['working_hours'] = 0;
                $validateData['off_days'] = 0;
                $validateData['total'] = 0;
                unset($validateData['staff']);
                $result = $this->salaryRepo->createSalary($validateData);
            } else {
                $staffs = $this->staffRepo->getAllStaffs();
                foreach ($staffs as $staff) {
                    $staff_salary = $this->salaryRepo->getSalaryByStaffAndDate($staff->id, $month, $year);
                    if ($staff_salary) {
                        return $this->sentErrorResponse("Salary in this month is already created", 'error', 404);
                    }
                    $salary = [
                        'staff_id' => $staff->id,
                        'month' => $month,
                        'year' => $year,
                        'working_days' => 0,
                        'working_hours' => 0,
                        'off_days' => 0,
                        'off_days_unapproved' => 0,
                        'total' => 0
                    ];
                    $result = $this->salaryRepo->createSalary($salary);
                }
            }
            return $this->sentSuccessResponse($result);
        } catch (\Exception $e) {
            $this->sentErrorResponse($e);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSalaryRequest $request)
    {
        $validateData = $request->validated();
        $month = $validateData['month'];
        $year = $validateData['year'];
        $staff = $this->staffRepo->getStaffByActive($validateData['staff']);
        if (!$staff) {
            return $this->sentErrorResponse("Staff is not found", "error", 404);
        }
        $validateData["staff_id"] = $staff->id;
        unset($validateData['staff']);
        $salary = $this->salaryRepo->getSalaryByStaffAndDate($staff->id, $month, $year);
        return $this->sentSuccessResponse($this->salaryRepo->updateSalaryByActive($salary->active, $validateData), "Updated successfully");
    }
}
