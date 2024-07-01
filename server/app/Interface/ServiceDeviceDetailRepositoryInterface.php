<?php

namespace App\Interface;
use Illuminate\Http\Request;

interface ServiceDeviceDetailRepositoryInterface
{
    public function getServiceDeviceDetail(Request $request);
    public function getServiceDeviceDetailByActive(string $active);
    public function createServiceDeviceDetail(array $data);
    public function updateServiceDeviceDetail(string $active, array $data);
    public function deleteServiceDeviceDetail(string $active);
}
