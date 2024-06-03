<?php

namespace App\Interface;

interface ServiceTypeRepositoryInterface{
    public function getServiceTypes($request);
    public function getServiceTypeByActive($active);
    public function createServiceType(array $data);
    public function updateServiceTypeByActive($active, array $data);
    public function deleteServiceTypeByActive($active);
}
