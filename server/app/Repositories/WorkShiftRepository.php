<?php

namespace App\Repositories;

use App\Interface\WorkShiftRepositoryInterface;
use App\Models\WorkShift;

class WorkShiftRepository implements WorkShiftRepositoryInterface
{
    public function getAllWorkShift()
    {
        return WorkShift::latest()->get();
    }

    public function getWorkShiftByActive($active)
    {
        $workshift = WorkShift::where("active", $active)->first();
        return $workshift;
    }
    public function createWorkShift(array $data)
    {
        return WorkShift::create($data);
    }
}
