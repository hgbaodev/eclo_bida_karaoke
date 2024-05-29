<?php

namespace App\Repositories;

use App\Interface\ShiftDetailRepositoryInterface;
use App\Models\ShiftDetail;

class ShiftDetailRepository implements ShiftDetailRepositoryInterface
{
    public function getShiftDetails($request)
    {
    }
    public function getAllShiftDetail()
    {
        return ShiftDetail::all();
    }
    public function getShiftDetailByActive($active)
    {
        return ShiftDetail::where("active", $active)->get();
    }
    public function createShiftDetail(array $data)
    {
        return ShiftDetail::create($data);
    }
    public function updateShiftDetailByActive($active, array $data)
    {
        $shiftDetail = ShiftDetail::where("active", $active);
        $shiftDetail->update($data);
        return $shiftDetail;
    }
    public function deleteShiftDetailByActive($active)
    {
        $shiftDetail = ShiftDetail::where("active", $active);
        $shiftDetail->delete();
        return $shiftDetail;
    }
}
