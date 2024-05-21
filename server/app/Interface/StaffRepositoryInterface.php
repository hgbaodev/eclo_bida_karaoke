<?php 

namespace App\Interface;


interface StaffRepositoryInterface {
    public function getAllStaff();
    public function getStaffById($id);
    public function createStaff(array $data);
    public function updateStaffById($id,array $data);
    public function deleteStaffById($id);

}