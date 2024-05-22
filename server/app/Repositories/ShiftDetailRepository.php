<?php

namespace App\Repositories;

use App\Interface\ShiftDetailRepositoryInterface;
use App\Models\ShiftDetail;

class ShiftDetailRepository implements ShiftDetailRepositoryInterface{
    public function getAllShiftDetail()
    {
        ShiftDetail::all();
    }
    public function getShiftDetailById($id)
    {
        ShiftDetail::find($id);
    }
    public function createShiftDetail(array $data)
    {
        ShiftDetail::create($data);
    }
    public function updateShiftDetailById($id, array $data)
    {
        $shiftDetail = ShiftDetail::find($id);
        $shiftDetail->update($data);
        return $shiftDetail;
    }
    public function deleteShiftDetailById($id)
    {
        $shiftDetail = ShiftDetail::find($id);
        $shiftDetail->delete();
        return $shiftDetail;
    }
}
