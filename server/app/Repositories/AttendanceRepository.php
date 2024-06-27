<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\AttendanceRepositoryInterface;
use App\Models\Attendance;

class AttendanceRepository implements AttendanceRepositoryInterface
{
    public function getAttendance($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');

        $timein = $request->input('time_in');
        $timeout = $request->input('time_out');
        $shift = Attendance::query();
        // if ($query) {
        //     $shift->whereRaw("CONCAT(time_in, ' ', time_out) LIKE '%$query%'");
        // }
        if ($id) {
            $shift->where("active", $id);
        }
        if ($timein) {
            $shift->where("time_in", $timein);
        }
        if ($timeout) {
            $shift->where("time_out", $timeout);
        }
        if ($all && $all == true) {
            $shift = $shift->get();
        } else {
            $shift = $shift->paginate($perPage);
        }
        return new CollectionCustom($shift);
    }
    public function getAllAttendance()
    {
        return Attendance::all();
    }
    public function getAttendanceByActive($active)
    {
        return Attendance::where("active", $active)->first();
    }
    public function createAttendance(array $data)
    {
        return Attendance::create($data);
    }
    public function updateAttendanceByActive($active, array $data)
    {
        $shift = Attendance::where("active", $active)->first();
        $shift->update($data);
        return $shift;
    }
    public function deleteAttendanceByActive($active)
    {
        $shift = Attendance::where("active", $active)->first();
        $shift->delete();
        return $shift;
    }
}
