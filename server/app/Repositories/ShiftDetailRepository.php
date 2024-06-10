<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\ShiftDetailRepositoryInterface;
use App\Models\ShiftDetail;

class ShiftDetailRepository implements ShiftDetailRepositoryInterface
{
    public function getShiftDetails($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $day_of_week = $request->input('day_of_week');
        $shift = $request->input('shift');
        $shiftdetail = ShiftDetail::query()->with(['shift']);
        if ($query) {
            $shiftdetail->whereRaw("CONCAT(day_of_week, ' ', quantity_of_staff) LIKE '%$query%'");
        }
        if ($day_of_week) {
            $shiftdetail->where("day_of_week", $day_of_week);
        }
        if ($shift) {
            $shiftdetail->whereHas('shift', function ($query) use ($shift) {
                $query->where("active", $shift);
            });
        }
        $shiftdetail->latest();
        if ($all && $all == true) {
            $shift = $shiftdetail->get();
        } else {
            $shift = $shiftdetail->paginate($perPage);
        }
        return new CollectionCustom($shift);
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
        $shiftDetail = ShiftDetail::where("active", $active)->first();
        $shiftDetail->update($data);
        return $shiftDetail;
    }
    public function deleteShiftDetailByActive($active)
    {
        $shiftDetail = ShiftDetail::where("active", $active)->first();
        $shiftDetail->delete();
        return $shiftDetail;
    }
}
