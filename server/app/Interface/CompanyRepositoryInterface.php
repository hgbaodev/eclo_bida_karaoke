<?php

namespace App\Interface;

interface CompanyRepositoryInterface
{
    public function getCompany($request);
    public function createCompany(array $data);
    public function getCompanyByActive($active);
    public function updateCompanyByActive($active, array $data);
    public function deleteCompanyByActive($active);
}