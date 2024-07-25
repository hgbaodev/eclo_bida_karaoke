<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\CompanyRepositoryInterface;
use App\Models\Company;

class CompanyRepository implements CompanyRepositoryInterface
{
    public function getCompany($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $companies = Company::query();
        if ($query) {
            $companies->whereRaw("company_name LIKE '%$query%'");
        }
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
    public function getCompanyByActive($active)
    {
        return Company::where("active", $active)->first();
    }
    public function updateCompanyByActive($active, array $data)
    {
        $device = Company::where('active', $active);
        $device->update($data);
        return $device;
    }
    public function deleteCompanyByActive($active)
    {
        $device = Company::where('active', $active);
        $device->delete();
        return $device;
    }
}