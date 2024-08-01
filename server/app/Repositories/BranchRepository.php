<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\BranchRepositoryInterface;
use App\Models\Branch;

class BranchRepository implements BranchRepositoryInterface
{
    public function getBranches($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $branch = Branch::with(["company"]);
        if ($all) {
            $branch = $branch->get();
        } else {
            $branch = $branch->paginate($perPage);
        }
        return new CollectionCustom($branch);
    }
    public function createBranch(array $data)
    {
        return Branch::create($data);
    }
    public function updateBranch($active, array $data)
    {
        $branch = Branch::where("active", $active)->first();
        $branch->update($data);
        return $branch;
    }
    public function deleteBranch($active)
    {
        $branch = Branch::where("active", $active)->first();
        $branch->delete();
        return $branch;
    }
    public function getBranchByActive($active)
    {
        return Branch::where("active", $active)->first();
    }
}
