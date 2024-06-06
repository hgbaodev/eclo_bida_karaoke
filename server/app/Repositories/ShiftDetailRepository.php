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
        $id = $request->input('id');
        $status = $request->input('status');
        $shiftdetail = ShiftDetail::query();
        if ($query) {
            $shiftdetail->whereRaw("CONCAT(day_of_week, ' ', quantity_of_staff) LIKE '%$query%'");
        }
        if ($id) {
            $shiftdetail->where("active", $id);
        }
        if ($status) {
            $shiftdetail->where("status", $status);
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
