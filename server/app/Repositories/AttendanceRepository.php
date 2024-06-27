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
        $staff = $request->input('staff');
        $day = $request->input('day');
        $timein = $request->input('time_in');
        $timeout = $request->input('time_out');
        $attendance = Attendance::query()->with(["staff"]);
        // if ($query) {
        //     $attendance->whereRaw("CONCAT(time_in, ' ', time_out) LIKE '%$query%'");
        // }
        if ($id) {
            $attendance->where("active", $id);
        }
        if ($timein) {
            $attendance->where("time_in", $timein);
        }
        if ($timeout) {
            $attendance->where("time_out", $timeout);
        }
        if ($all && $all == true) {
            $attendance = $attendance->get();
        } else {
            $attendance = $attendance->paginate($perPage);
        }
        return new CollectionCustom($attendance);
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
        $attendance = Attendance::where("active", $active)->first();
        $attendance->update($data);
        return $attendance;
    }
    public function deleteAttendanceByActive($active)
    {
        $attendance = Attendance::where("active", $active)->first();
        $attendance->delete();
        return $attendance;
    }
    public function getAttendanceByUUIDAndDay($id, $day)
    {
        $attendance = Attendance::query();
        $attendance->where("staff_id", $id);
        $attendance->where("day", $day);
        return $attendance->first();
    }
}
