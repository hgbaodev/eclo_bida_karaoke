<?php

namespace App\Repositories;

use App\Interface\ServiceDeviceDetailRepositoryInterface;
use App\Models\ServiceDeviceDetail;
use Illuminate\Http\Request;
use App\Http\Collections\GeneralResourceCollection;
use App\Http\Resources\ServiceDeviceDetailResource;

class ServiceDeviceDetailRepository implements ServiceDeviceDetailRepositoryInterface
{

    /**
     * @param Request $request
     * @return mixed
     */
    public function getServiceDeviceDetail(Request $request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $serviceActive = $request->input('serviceActive');
        $deviceActive = $request->input('deviceActive');
        $status = $request->input('status');
        $query = $request->input('query');

        $serviceDeviceDetail = ServiceDeviceDetail::with('service', 'device');
        $serviceDeviceDetail->latest();

        if ($query) {
            $serviceDeviceDetail->where(function ($q) use ($query) {
                $q->whereHas('device', function ($q2) use ($query) {
                    $q2->where('name', 'like', "%$query%");
                })->orWhereHas('service', function ($q2) use ($query) {
                    $q2->where('name', 'like', "%$query%");
                });
            });
        }

        if ($serviceActive) {
            $serviceDeviceDetail->whereHas('service', function ($query) use ($serviceActive) {
                $query->where('active', $serviceActive);
            });
        }
        if ($deviceActive) {
            $serviceDeviceDetail->whereHas('device', function ($query) use ($deviceActive) {
                $query->where('active', $deviceActive);
            });
        }
        if ($status) {
            $serviceDeviceDetail->where('status', $status);
        }
        if ($all) {
            $serviceDeviceDetail = $serviceDeviceDetail->get();
        } else {
            $serviceDeviceDetail = $serviceDeviceDetail->paginate($perPage);
        }

        $data = new GeneralResourceCollection($serviceDeviceDetail, ServiceDeviceDetailResource::class);
        return $data;
    }

    /**
     * @param string $active
     * @return mixed
     */
    public function getServiceDeviceDetailByActive(string $active)
    {
        $returnedData = ServiceDeviceDetail::where('active', $active)->firstOrFail();
        return $returnedData;
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function createServiceDeviceDetail(array $data)
    {
        return ServiceDeviceDetail::create($data);
    }

    /**
     * @param string $active
     * @param array $data
     * @return mixed
     */
    public function updateServiceDeviceDetailByActive(string $active, array $data)
    {
        $returnedData = ServiceDeviceDetail::where('active', $active)->firstOrFail();
        $returnedData->update($data);
        return $returnedData;
    }

    /**
     * @param string $active
     * @return mixed
     */
    public function deleteServiceDeviceDetailByActive(string $active)
    {
        $returnedData = ServiceDeviceDetail::where('active', $active)->firstOrFail();
        $returnedData->delete();
        return $returnedData;
    }
}
