<?php

namespace App\Interface;

interface SupplierRepositoryInterface{
    public function getAllSuppliers($request);
    public function getSupplierById($id);
    public function getSupplierByActive($active);
    public function createSupplier(array $data);
    public function updateSupplierById($id, array $data);
    public function updateSupplierByActive($active, array $data);
    public function deleteSupplierById($id);
    public function deleteSupplierByActive($active);
}
