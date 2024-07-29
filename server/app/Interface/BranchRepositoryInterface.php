<?php

namespace App\Interface;

interface BranchRepositoryInterface
{
  public function getBranches($request);
  public function createBranch(array $data);
}
