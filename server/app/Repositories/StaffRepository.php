<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\StaffRepositoryInterface;
use App\Models\Staff;

class StaffRepository implements StaffRepositoryInterface
{
    public function getStaffs($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $idcard = $request->input('idcard');
        $position = $request->input('position');
        $staffs = Staff::query();
        if ($query) {
            $staffs->where("id", "LIKE", "%$query%")
                ->orWhere("name", "LIKE", "%$query%");
        }
        if ($id) {
            $staffs->where('id', $id);
        }
        if ($position) {
            $staffs->where('position_id', $position);
        }
        if ($idcard) {
            $staffs->where('idcard', $idcard);
        }
        if ($all && $all == true) {
            $staffs = $staffs->get();
        } else {
            $staffs = $staffs->paginate($perPage);
        }
        return new CollectionCustom($staffs);
    }
    public function getAllStaffs()
    {
        return Staff::all();
    }
    public function getStaffByActive($active)
    {
        return Staff::where("active", $active)->get();
    }
    public function createStaff(array $data)
    {
        return Staff::create($data);
    }
    public function updateStaffByActive($active, array $data)
    {
        $staff = Staff::where("active", $active)->get();
        $staff->update($data);
        return $staff;
    }
    public function deleteStaffByActive($active)
    {
        $staff = Staff::where("active", $active)->get();
        $staff->delete();
        return $staff;
    }
}
