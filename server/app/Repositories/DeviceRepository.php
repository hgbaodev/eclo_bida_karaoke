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
