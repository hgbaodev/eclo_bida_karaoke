<?php

namespace App\Interface;


interface BranchRepositoryInterface
{
    public function getBranch($request);
    public function getAllBranch();
    public function getBranchByActive($active);
    public function createBranch(array $data);
    public function updateBranchByActive($active, array $data);
    public function deleteBranchByActive($active);
}
