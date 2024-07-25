<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\CompanyRepositoryInterface;
use App\Models\Company;

class CompanyRepository implements CompanyRepositoryInterface
{
    public function getCompanies($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $companies = Company::with([]);
        if ($all) {
            $companies = $companies->get();
        } else {
            $companies = $companies->paginate($perPage);
        }
        return new CollectionCustom($companies);
    }
    public function createCompany(array $data)
    {
        return Company::create($data);
    }
    public function updateCompanyById($id, array $data)
    {
        $company = Company::find($id);
        $company->update($data);
        return $company;
    }
    public function getCompanyByActive($active)
    {
        $company = Company::where('active', $active)->first();
        return $company;
    }
}
