<?php

namespace App\Interface;


interface DayOffRepositoryInterface
{
    public function getDayOffs($request);
    public function getAllDayOff();
    public function create(array $data);
    public function getDayOffByActive($active);
    public function updateDayOffByActive($active, array $data);
    public function deleteByActive($active);

    public function countDayOffByStaff($staff_id, $month, $year);
    public function getDayOffByStaffAndDay($staff_id, $day_off);
}
