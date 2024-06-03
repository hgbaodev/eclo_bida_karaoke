<?php
namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\ServiceTypeRepositoryInterface;
use App\Models\ServiceType;
class ServiceTypeRepository implements ServiceTypeRepositoryInterface
{

    function getServiceTypes($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');

        $serviceTypes = ServiceType::query();
        $serviceTypes->latest();

        if($all){
            $serviceTypes = $serviceTypes->get();
        } else {
            $serviceTypes = $serviceTypes->paginate($perPage);
        }
        return new CollectionCustom($serviceTypes);
    }

    public function getServiceTypeByActive($active)
    {
        return ServiceType::where('active', $active)->firstOrFail();
    }

    public function createServiceType(array $data)
    {
        return ServiceType::create($data);
    }

    public function updateServiceTypeByActive($active, array $data)
    {
        $serviceType = ServiceType::where('active', $active)->firstOrFail();
        $serviceType->update($data);
        return $serviceType;
    }

    public function deleteServiceTypeByActive($active)
    {
        $serviceType = ServiceType::where('active', $active)->firstOrFail();
        $serviceType->delete($active);
        return $serviceType;
    }
}
