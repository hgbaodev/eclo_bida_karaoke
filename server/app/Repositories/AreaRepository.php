<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\AreaRepositoryInterface;
use App\Models\Area;
use App\Models\Order;
use App\Models\Service;

class AreaRepository implements AreaRepositoryInterface
{

    function getAreas($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $areas = Area::with(['services']);
        if ($all) {
            $areas = $areas->get();
        } else {
            $areas = $areas->paginate($perPage);
        }
        return new CollectionCustom($areas);
    }

    function getAreaById($id)
    {
        return Area::find($id);
    }

    function createArea(array $data)
    {
        return Area::create($data);
    }

    function updateAreaById($id, array $data)
    {
        $area = Area::find($id);
        $area->update($data);
        return $area;
    }

    function deleteAreaById($id)
    {
        $area = Area::find($id);
        $area->delete();
        return $area;
    }

    public function getAreaByActive($active)
    {
        $area = Area::where('active', $active)->first();
        return $area;
    }

    public function getAllAreaWithServices()
    {
        $areas = Area::all();
        $areas = $areas->map(function ($area) {
            $area->services = Service::where('area_id', $area->id)
                ->where('status', 'A')
                ->get();
            $area->services = $area->services->map(function ($service) {
                $foundServiceOrder = Order::where('service_id', $service->id)
                    ->where('checkout_time', null)
                    ->first();
                if ($foundServiceOrder)
                    $service->is_booked = true;
                else
                    $service->is_booked = false;
                return $service;
            });
            return $area;
        });
        return $areas;
    }
}
