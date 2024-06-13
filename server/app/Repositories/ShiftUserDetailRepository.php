<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\ShiftUserDetailRepositoryInterface;
use App\Models\ShiftUserDetail;

class ShiftUserDetailRepository implements ShiftUserDetailRepositoryInterface
{
    public function getShiftUserDetail($request)
    {
    }
    public function getAllShiftUserDetail()
    {
        $shiftUserDetails = ShiftUserDetail::query()->with(["shift", "staff"]);
        $shiftUserDetails->orderByRaw("FIELD(day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')")->orderBy('shift_id')->get();
        return $shiftUserDetails->get();
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
    public function checkUniqueByStaffDay($staff, $day_of_week)
    {
        $shiftUserDetail = ShiftUserDetail::query();
        $shiftUserDetail->where("staff_id", $staff);
        $shiftUserDetail->where("day_of_week", $day_of_week);
        return $shiftUserDetail->get();
    }
}
