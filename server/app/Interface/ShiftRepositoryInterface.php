<?php 

namespace App\Interface;


interface ShiftRepositoryInterface {
    public function getAllShift();
    public function getShiftById($id);
    public function createShift(array $data);
    public function updateShiftById($id,array $data);
    public function deleteShiftById($id);

}