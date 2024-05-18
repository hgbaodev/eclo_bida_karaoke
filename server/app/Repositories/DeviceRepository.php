<?php

namespace App\Repositories;

use App\Interface\DeviceRepositoryInterface;
use App\Models\Device;

class DeviceRepository implements DeviceRepositoryInterface {

    function getAllDevices()
    {
        return Device::all();
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
