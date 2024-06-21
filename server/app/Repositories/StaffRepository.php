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
        // dd($request);
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $idcard = $request->input('idcard');
        $status = $request->input('status');
        $position = $request->input('position');
        $staffs = Staff::query()->with(['position', 'user']);
        if ($query) {
            $staffs->whereRaw("CONCAT(name, ' ', phone, ' ', idcard) LIKE '%$query%'");
        }
        if ($status) {
            $staffs->where('status', $status);
        }
        if ($position) {
            $staffs->whereHas('position', function ($query) use ($position) {
                $query->where("active", $position);
            });
        }
        if ($idcard) {
            $staffs->where('idcard', $idcard);
        }
        $staffs->latest();
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
        return Staff::where("active", $active)->first();
    }
    public function createStaff(array $data)
    {
        return Staff::create($data);
    }
    public function updateStaffByActive($active, array $data)
    {
        $staff = Staff::where("active", $active)->first();
        $staff->update($data);
        return $staff;
    }
    public function deleteStaffByActive($active)
    {
        $staff = Staff::where("active", $active)->first();
        $staff->delete();
        return $staff;
    }
}
