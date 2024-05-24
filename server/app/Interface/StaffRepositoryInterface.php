<?php

namespace App\Interface;


interface StaffRepositoryInterface
{
    public function getAllStaffs();
    public function getStaffByActive($active);
    public function createStaff(array $data);
    public function updateStaffById($id, array $data);
    public function deleteStaffById($id);
}
