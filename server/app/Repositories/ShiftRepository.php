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
        return Shift::find($active);
    }
    public function createShift(array $data)
    {
        return Shift::create($data);
    }
    public function updateShiftByActive($active, array $data)
    {
        $shift = Shift::find($active);
        $shift->update($data);
        return $shift;
    }
    public function deleteShiftByActive($active)
    {
        $shift = Shift::find($active);
        $shift->delete();
        return $shift;
    }
}
