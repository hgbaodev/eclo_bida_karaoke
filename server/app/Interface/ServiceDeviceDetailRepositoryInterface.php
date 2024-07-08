<?php

namespace App\Interface;
use Illuminate\Http\Request;

interface ServiceDeviceDetailRepositoryInterface
{
    public function getServiceDeviceDetail(Request $request);
    public function getServiceDeviceDetailByActive(string $active);
    public function createServiceDeviceDetail(array $data);
    public function updateServiceDeviceDetailByActive(string $active, array $data);
    public function deleteServiceDeviceDetailByActive(string $active);
    public function existsServiceDeviceDetail(string $serviceId, string $deviceId);
    public function updateMaintenanceQuantity(int $serviceId, int $deviceId, int $maintenance);

}
