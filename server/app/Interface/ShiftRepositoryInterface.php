<?php 

namespace App\Interface;


interface ShiftRepositoryInterface {
    public function getAllShifts();
    public function getShiftById($id);
    public function createShift(array $data);
    public function updateShiftById($id,array $data);
    public function deleteShiftById($id);

}