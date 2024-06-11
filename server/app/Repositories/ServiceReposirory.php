<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\ServiceRepositoryInterface;
use App\Models\Service;

class ServiceReposirory implements ServiceRepositoryInterface
{
  public function getServices($request)
  {
    $all = $request->input('all');
    $perPage = $request->input('perPage');
    $query = $request->input('query');
    $area = $request->input('area');
    $services = Service::query()->with(['area', 'price']);
    if ($query) {
      $services->whereRaw("name LIKE ?", ["%$query%"]);
    }
    if ($area) {
      $services->whereHas('area', function ($query) use ($area) {
        $query->where('active', $area);
      });
    }
    $services->orderBy('id', 'desc');
    if ($all && $all == true) {
      $services = $services->get();
    } else {
      $services = $services->paginate($perPage ?? 10);
    }
    return new CollectionCustom($services);
  }
  public function getServiceById($id)
  {
  }
  public function createService(array $data)
  {
    return Service::create($data);
  }
  public function updateServiceById($id, array $data)
  {
  }
  public function deleteServiceById($active)
  {
  }
  public function getServiceByActive($active)
  {
    $service = Service::where('active', $active)->first();
    return $service;
  }
}
