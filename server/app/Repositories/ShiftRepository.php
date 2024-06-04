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
        $shift->latest();
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
        return Shift::where("active", $active)->get();
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
