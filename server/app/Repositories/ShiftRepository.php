<?php

namespace App\Repositories;

use App\Interface\ShiftRepositoryInterface;
use App\Models\Shift;

class ShiftRepository implements ShiftRepositoryInterface{
    public function getAllShift()
    {
        Shift::all();
    }
    public function getShiftById($id)
    {
        Shift::find($id);
    }
    public function createShift(array $data)
    {
        Shift::create($data);
    }
    public function updateShiftById($id, array $data)
    {
        $shift = Shift::find($id);
        $shift->update($data);
        return $shift;
    }
    public function deleteShiftById($id)
    {
        $shift = Shift::find($id);
        $shift->delete();
        return $shift;
    }
}
