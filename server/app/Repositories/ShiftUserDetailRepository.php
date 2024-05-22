<?php

namespace App\Repositories;

use App\Interface\ShiftUserDetailRepositoryInterface;
use App\Models\ShiftUserDetail;

class ShiftUserDetailRepository implements ShiftUserDetailRepositoryInterface{
    public function getAllShiftUserDetail()
    {
        ShiftUserDetail::all();
    }
    public function getShiftUserDetailById($id)
    {
        ShiftUserDetail::find($id);
    }
    public function createShiftUserDetail(array $data)
    {
        ShiftUserDetail::create($data);
    }
    public function updateShiftUserDetailById($id, array $data)
    {
        $shiftUserDetail = ShiftUserDetail::find($id);
        $shiftUserDetail->update($data);
        return $shiftUserDetail;
    }
    public function deleteShiftUserDetailById($id)
    {
        $shiftUserDetail = ShiftUserDetail::find($id);
        $shiftUserDetail->delete();
        return $shiftUserDetail;
    }
}
