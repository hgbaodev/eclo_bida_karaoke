<?php

namespace App\Interface;


interface ShiftRepositoryInterface
{
    public function getAllShifts();
    public function getShiftByActive($id);
    public function createShift(array $data);
    public function updateShiftByActive($id, array $data);
    public function deleteShiftByActive($id);
}
