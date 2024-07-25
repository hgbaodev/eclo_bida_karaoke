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
        $user = $request->input('user');
        $staffs = Staff::query()->with(['position', 'user', 'user.role']);
        if ($query) {
            $staffs->whereRaw("CONCAT(first_name,' ',last_name, ' ', phone, ' ', idcard) LIKE '%$query%'");
        }
        if ($status) {
            $staffs->where('status', $status);
        }
        if ($position) {
            $staffs->whereHas('position', function ($query) use ($position) {
                $query->where("active", $position);
            });
        }
        if ($user) {
            $staffs->whereHas('user', function ($query) use ($user) {
                $query->where("active", $user);
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
        return Staff::query()->with(['position'])->get();
    }
    public function getStaffByActive($active)
    {
        $staff = Staff::query()->with(["position"]);
        $staff->where("active", $active);
        return $staff->first();
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
    public function countSimilarPositions($positionID)
    {
        return Staff::where("position_id", $positionID)->count();
    }

    public function getStaffByUUID($uuid)
    {
        return Staff::where("uuid", $uuid)->first();
    }
}
