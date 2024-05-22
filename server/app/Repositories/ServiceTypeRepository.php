<?php
namespace App\Repositories;

use App\Interface\ServiceTypeRepositoryInterface;
use App\Models\ServiceType;
class ServiceTypeRepository implements ServiceTypeRepositoryInterface
{

    public function getAllServiceTypes()
    {
        return ServiceType::all();
    }

    public function getServiceTypeById($id)
    {
        return ServiceType::find($id);
    }

    public function createServiceType(array $data)
    {
        return ServiceType::create($data);
    }

    public function updateServiceTypeById($id, array $data)
    {
        $serviceType = ServiceType::find($id);
        $serviceType->update($data);
        return $serviceType;
    }

    public function deleteServiceTypeById($id)
    {
        $serviceType = ServiceType::find($id);
        $serviceType->delete($id);
        return $serviceType;
    }
}
