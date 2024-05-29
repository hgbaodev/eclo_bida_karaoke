<?php

namespace App\Interface;


interface StaffRepositoryInterface
{
    public function getStaffs($request);
    public function getAllStaffs();
    public function getStaffByActive($active);
    public function createStaff(array $data);
    public function updateStaffByActive($id, array $data);
    public function deleteStaffByActive($id);
}
