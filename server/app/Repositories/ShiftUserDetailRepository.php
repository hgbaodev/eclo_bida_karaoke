<?php

namespace App\Repositories;

use App\Interface\ShiftUserDetailRepositoryInterface;
use App\Models\ShiftUserDetail;

class ShiftUserDetailRepository implements ShiftUserDetailRepositoryInterface
{
    public function getShiftUserDetail($request)
    {
        $workshift = $request->input('workshift');
        $shiftUserDetails = ShiftUserDetail::query()->with(["shift", "staff", "workshift"]);
        $shiftUserDetails->orderByRaw("FIELD(day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')")->orderBy('shift_id');
        if ($workshift) {
            $shiftUserDetails->whereHas('workshift', function ($query) use ($workshift) {
                $query->where("active", $workshift);
            });
            return $shiftUserDetails->get();
        }
        return [];
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
    public function checkUniqueByStaffDay($staff, $day_of_week, $workshift)
    {
        $shiftUserDetail = ShiftUserDetail::query();
        $shiftUserDetail->where("staff_id", $staff);
        $shiftUserDetail->where("day_of_week", $day_of_week);
        $shiftUserDetail->where("workshift_id", $workshift);
        return $shiftUserDetail->get();
    }
}
