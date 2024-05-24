<?php

namespace App\Repositories;

use App\Interface\ShiftRepositoryInterface;
use App\Models\Shift;

class ShiftRepository implements ShiftRepositoryInterface
{
    public function getAllShifts()
    {
        return Shift::all();
    }
    public function getShiftByActive($active)
    {
        return Shift::where("active", $active)->get();
    }
    public function createShift(array $data)
    {
        return Shift::create($data);
    }
    public function updateShiftByActive($active, array $data)
    {
        $shift = Shift::where("active", $active)->get();
        $shift->update($data);
        return $shift;
    }
    public function deleteShiftByActive($active)
    {
        $shift = Shift::where("active", $active)->get();
        $shift->delete();
        return $shift;
    }
}
