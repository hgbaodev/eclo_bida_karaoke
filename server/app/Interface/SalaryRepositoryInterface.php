<?php

namespace App\Interface;

interface SalaryRepositoryInterface
{
    public function getSalary($request);
    public function getAllSalaries();
    public function getSalaryByStaffAndDate($staff, $month, $year);
    public function getSalaryByActive($id);
    public function createSalary(array $data);
    public function updateSalaryByActive($active, array $data);
    public function deleteSalaryByActive($id);
}
