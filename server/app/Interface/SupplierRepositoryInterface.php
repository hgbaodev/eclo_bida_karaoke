<?php

namespace App\Interface;

interface SupplierRepositoryInterface{
    public function getAllSuppliers();
    public function getSupplierById($id);
    public function createSupplier(array $data);
    public function updateSupplierById($id, array $data);
    public function deleteSupplierById($id);
}
