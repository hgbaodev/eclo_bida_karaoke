<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\ShiftRepositoryInterface;
use App\Models\Shift;

class ShiftRepository implements ShiftRepositoryInterface
{
    public function getShifts($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $status = $request->input('status');
        $timein = $request->input('time_in');
        $timeout = $request->input('time_out');
        $shift_type = $request->input('shift_type');
        $shift = Shift::query();
        if ($query) {
            $shift->whereRaw("CONCAT(time_in, ' ', time_out) LIKE '%$query%'");
        }
        if ($id) {
            $shift->where("active", $id);
        }
        if ($timein) {
            $shift->where("time_in", $timein);
        }
        if ($timeout) {
            $shift->where("time_out", $timeout);
        }
        if ($status) {
            $shift->where("status", $status);
        }
        if ($shift_type) {
            $shift->where("shift_type", $shift_type);
        }
        $shift->orderByRaw("FIELD(shift_type, 'P', 'F')")->orderBy('id');
        if ($all && $all == true) {
            $shift = $shift->get();
        } else {
            $shift = $shift->paginate($perPage);
        }
        return new CollectionCustom($shift);
    }
    public function getAllShifts()
    {
        return Shift::all();
    }
    public function getShiftByActive($active)
    {
        return Shift::where("active", $active)->first();
    }
    public function createShift(array $data)
    {
        return Shift::create($data);
    }
    public function updateShiftByActive($active, array $data)
    {
        $shift = Shift::where("active", $active)->first();
        $shift->update($data);
        return $shift;
    }
    public function deleteShiftByActive($active)
    {
        $shift = Shift::where("active", $active)->first();
        $shift->delete();
        return $shift;
    }
}
