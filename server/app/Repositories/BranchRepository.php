<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\BranchRepositoryInterface;
use App\Models\Branch;

class BranchRepository implements BranchRepositoryInterface
{
    public function getBranch($request)
    {
        $all = $request->input('all');
        // dd($request);
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $company = $request->input('company');
        $branch = Branch::query();
        if ($query) {
            $branch->whereRaw("CONCAT(name,' ',phone, ' ', address, ' ', idcard) LIKE '%$query%'");
        }
        if ($all && $all == true) {
            $branch = $branch->get();
        } else {
            $branch = $branch->paginate($perPage);
        }
        return new CollectionCustom($branch);
    }
    public function getAllBranch()
    {
        return Branch::all();
    }
    public function getBranchByActive($active)
    {
        return Branch::where("active", $active)->first();
    }
    public function createBranch(array $data)
    {
        return Branch::created($data);
    }
    public function updateBranchByActive($active, array $data)
    {
        $branch = Branch::where('active', $active)->firstOrFail();
        $branch->update($data);
        return $branch;
    }
    public function deleteBranchByActive($active)
    {
        $branch = Branch::where("active", $active)->first();
        $branch->delete();
        return $branch;
    }
}
