<?php 

namespace App\Interface;


interface ShiftUserDetailRepositoryInterface {
    public function getAllShiftUserDetail();
    public function getShiftUserDetailById($id);
    public function createShiftUserDetail(array $data);
    public function updateShiftUserDetailById($id,array $data);
    public function deleteShiftUserDetailById($id);

}