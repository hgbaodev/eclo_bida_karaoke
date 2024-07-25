<?php

namespace App\Interface;

interface CompanyRepositoryInterface
{
  public function getCompanies($request);
  public function createCompany(array $data);
  public function updateCompanyById($id, array $data);
  public function getCompanyByActive($active);
}
