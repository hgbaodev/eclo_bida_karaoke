<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\AttendanceRepositoryInterface;
use App\Models\Attendance;

class AttendanceRepository implements AttendanceRepositoryInterface
{
    public function getAttendance($request)
    {
        $query = $request->input('query');
        $id = $request->input('id');
        $staff = $request->input('staff');
        $year = $request->input('year');
        $month = $request->input('month');
        $attendance = Attendance::query()->with(["staff"]);
        if ($query) {
            $attendance->whereRaw("CONCAT(staff.first_name, ' ',staff.last_name) LIKE ?", ["%$query%"]);
        }
        if ($id) {
            $attendance->where("active", $id);
        }
        if ($year) {
            $attendance->whereYear("day", $year);
        }
        if ($month) {
            $attendance->whereMonth("day", $month);
        }

        return $attendance->get();
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
    public function countAttendanceComplete($staff_id, $month, $year)
    {
        $attendance = Attendance::where("staff_id", $staff_id)
            ->whereMonth("day", $month)
            ->whereYear("day", $year)
            ->whereNotNull("check_out")
            ->whereNotNull("check_in");
        return $attendance->count();
    }
    public function getAttendanceComplete($staff_id, $month, $year)
    {
        $attendance = Attendance::where("staff_id", $staff_id)
            ->whereMonth("day", $month)
            ->whereYear("day", $year)
            ->whereNotNull("check_out")
            ->whereNotNull("check_in");
        return $attendance->get();
    }
}
