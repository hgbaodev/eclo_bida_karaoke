<?php 

namespace App\Interface;


interface ShiftDetailRepositoryInterface {
    public function getAllShiftDetail();
    public function getShiftDetailById($id);
    public function createShiftDetail(array $data);
    public function updateShiftDetailById($id,array $data);
    public function deleteShiftDetailById($id);

}