<?php

namespace App\Repositories;

use App\Interface\ShiftUserDetailRepositoryInterface;
use App\Models\ShiftUserDetail;

class ShiftUserDetailRepository implements ShiftUserDetailRepositoryInterface
{
    public function getShiftUserDetail($request)
    {
    }
    public function getAllShiftUserDetail()
    {
        return ShiftUserDetail::all();
    }
    public function getShiftUserDetailByActive($active)
    {
        return ShiftUserDetail::where("active", $active);
    }
    public function createShiftUserDetail(array $data)
    {
        return ShiftUserDetail::create($data);
    }
    public function updateShiftUserDetailByActive($active, array $data)
    {
        $shiftUserDetail = ShiftUserDetail::where("active", $active)->first();
        $shiftUserDetail->update($data);
        return $shiftUserDetail;
    }
    public function deleteShiftUserDetailByActive($active)
    {
        $shiftUserDetail = ShiftUserDetail::where("active", $active)->first();
        $shiftUserDetail->delete();
        return $shiftUserDetail;
    }
}
