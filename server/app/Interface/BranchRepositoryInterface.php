<?php

namespace App\Interface;

interface BranchRepositoryInterface
{
  public function getBranches($request);
  public function createBranch(array $data);
  public function updateBranch($active, array $data);
  public function deleteBranch($active);
  public function getBranchByActive($active);
}
