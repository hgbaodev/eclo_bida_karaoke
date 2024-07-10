<?php

namespace App\Interface;


interface AttendanceRepositoryInterface
{
    public function getAttendance($request);
    public function getAllAttendance();
    public function getAttendanceByActive($id);
    public function createAttendance(array $data);
    public function updateAttendanceByActive($id, array $data);
    public function deleteAttendanceByActive($id);
    public function getAttendanceComplete($staff_id, $month, $year);
    public function getAttendanceByUUIDAndDay($id, $day);
    public function countAttendanceComplete($staff_id, $month, $year);
}
