<?php

namespace App\Repositories;

use App\Interface\UserBranchRepositoryInterface;
use App\Models\UserBranch;

class UserBranchRepository implements UserBranchRepositoryInterface
{
    public function createUserBranch(array $data)
    {
        UserBranch::create($data);
    }
}
