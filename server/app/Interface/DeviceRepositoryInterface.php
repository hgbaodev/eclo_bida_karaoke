<?php

namespace App\Interface;

interface DeviceRepositoryInterface
{
    public function getDevices($request);
    public function getDeviceByActive(string $active);
    public function createDevice(array $data);
    public function updateDeviceByActive(string $active, array $data);
    public function deleteDeviceByActive(string $active);
}
