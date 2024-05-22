<?php

namespace App\Repositories;

use App\Interface\StaffRepositoryInterface;
use App\Models\Staff;

class StaffRepository implements StaffRepositoryInterface{
    public function getAllStaff()
    {
        Staff::all();
    }
    public function getStaffById($id)
    {
        Staff::find($id);
    }
    public function createStaff(array $data)
    {
        Staff::create($data);
    }
    public function updateStaffById($id, array $data)
    {
        $staff = Staff::find($id);
        $staff->update($data);
        return $staff;
    }
    public function deleteStaffById($id)
    {
        $staff = Staff::find($id);
        $staff->delete();
        return $staff;
    }
}
