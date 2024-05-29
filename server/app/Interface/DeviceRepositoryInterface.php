<?php

namespace App\Interface;

interface DeviceRepositoryInterface
{
    public function getDevices($request);
    public function getDeviceById($id);
    public function createDevice(array $data);
    public function updateDeviceById($id, array $data);
    public function deleteDeviceById($id);
}
