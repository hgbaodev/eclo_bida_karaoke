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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SalaryRequest $request)
    {
        $validateData = $request->validated();
        $staff = $this->staffRepo->getStaffByActive($validateData['staff']);
        if (!$staff) {
            return $this->sentErrorResponse("Staff is not found", 'error', 404);
        }
        $validateData['staff_id'] = $staff->id;
        unset($validateData['staff']);
        return $this->sentSuccessResponse($this->salaryRepo->createSalary($validateData));
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
    public function update(UpdateSalaryRequest $request)
    {
        $validateData = $request->validated();
        $staff = $this->staffRepo->getStaffByActive($validateData['staff']);
        if (!$staff) {
            return $this->sentErrorResponse("Staff is not found", "error", 404);
        }
        $validateData["staff_id"] = $staff->id;
        unset($validateData['staff']);
        $salary = $this->salaryRepo->getSalaryByStaffAndDate($staff->id, $validateData['month'], $validateData['year']);
        return $this->sentSuccessResponse($this->salaryRepo->updateSalaryByActive($salary->active, $validateData), "Updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
