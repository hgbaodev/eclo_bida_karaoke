<?php

namespace App\Repositories;

use App\Interface\BranchRepositoryInterface;
use App\Models\Branch;

class BranchRepository implements BranchRepositoryInterface
{
    public function getBranches($request)
    {
    }
    public function createBranch(array $data)
    {
        return Branch::create($data);
    }
}
