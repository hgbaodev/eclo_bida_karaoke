<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\DeviceRepositoryInterface;
use App\Models\Device;

class DeviceRepository implements DeviceRepositoryInterface
{
    function getDevices($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $deivies = Device::query();
        if ($query) {
            $deivies->where("id", "LIKE", "%$query%")
                ->where("name", "LIKE", "%$query%")
                ->where("description", "LIKE", "%$query%");
        }
        $deivies->orderBy('id', 'desc');
        if ($all && $all == true) {
            $deivies = $deivies->get();
        } else {
            $deivies = $deivies->paginate($perPage ?? 10);
        }
        return new CollectionCustom($deivies);
    }

    function getDeviceById($id)
    {
        return Device::find($id);
    }

    function createDevice(array $data)
    {
        return Device::create($data);
    }

    function updateDeviceById($id, array $data)
    {
        $device = Device::find($id);
        $device->update($data);
        return $device;
    }

    function deleteDeviceById($id)
    {
        $device = Device::find($id);
        $device->delete();
        return $device;
    }
}