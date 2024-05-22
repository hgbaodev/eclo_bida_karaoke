<?php

namespace App\Interface;

interface ServiceTypeRepositoryInterface{
    public function getAllServiceTypes();
    public function getServiceTypeById($id);
    public function createServiceType(array $data);
    public function updateServiceTypeById($id, array $data);
    public function deleteServiceTypeById($id);
}
