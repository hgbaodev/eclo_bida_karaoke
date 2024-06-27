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
        $status = $request->input('status');

        $devices = Device::query();
        $devices->latest();

        if ($query) {
            $devices->whereRaw("CONCAT(name, ' ', description) LIKE '%$query%'");
        }
        if ($status) {
            $devices->where('status', $status);
        }
        if ($all) {
            $devices = $devices->get();
        }
        else {
            $devices = $devices->paginate($perPage);
        }
        return new CollectionCustom($devices);
    }

    function createDevice(array $data)
    {
        return Device::create($data);
    }

    function getDeviceByActive(string $active)
    {
        $device = Device::where('active', $active);
        return $device;
    }

    function updateDeviceByActive(string $active, array $data)
    {
        $device = Device::where('active', $active);
        $device->update($data);
        return $device;
    }

    function deleteDeviceByActive(string $active)
    {
        $device = Device::where('active', $active);
        $device->delete();
        return $device;
    }
}
