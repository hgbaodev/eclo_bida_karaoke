<?php

namespace App\Repositories;

use App\Interface\SalaryRepositoryInterface;
use App\Models\Salary;

class SalaryRepository implements SalaryRepositoryInterface
{
    public function getSalary($request)
    {
        $query = $request->input('query');
        $position = $request->input('position');
        $month = $request->input('month');
        $year = $request->input('year');
        $salary = Salary::query()->with(['staff', 'staff.position']);
        if ($query) {
            $salary->whereRaw("CONCAT(staff.first_name, ' ',staff.last_name) LIKE ?", ["%$query%"]);
        }
        if ($position) {
            $salary->whereHas('position', function ($query) use ($position) {
                $query->where("active", $position);
            });
        }
        if ($year) {
            $salary->where("year", $year);
        }
        if ($month) {
            $salary->where("month", $month);
        }
        return $salary->get();
    }
    public function getAllSalaries()
    {
        return Salary::all();
    }
    public function getSalaryByActive($active)
    {
        return Salary::where("active", $active);
    }
    public function createSalary(array $data)
    {
        return Salary::create($data);
    }
    public function updateSalaryByActive($active, array $data)
    {
        $salary = Salary::where("active", $active)->first();
        $salary->update($data);
        return $salary;
    }
    public function deleteSalaryByActive($active)
    {
        $salary = Salary::where("active", $active)->first();
        $salary->delete();
        return $salary;
    }
    public function getSalaryByStaffAndDate($staff, $month, $year)
    {
        $salary = Salary::with(['staff', 'staff.position']);
        $salary->where('staff_id', $staff)
            ->where('month', $month)
            ->where('year', $year);
        return $salary->first();
    }
}
