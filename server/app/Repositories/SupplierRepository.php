<?php

namespace App\Repositories;

use App\Interface\SupplierRepositoryInterface;
use App\Models\Supplier;

class SupplierRepository implements SupplierRepositoryInterface {

    function getAllSuppliers()
    {
        return Supplier::all();
    }

    function getSupplierById($id)
    {
        return Supplier::find($id);
    }

    function createSupplier(array $data)
    {
        return Supplier::create($data);
    }

    function updateSupplierById($id, array $data)
    {
        $supplier = Supplier::find($id);
        $supplier->update($data);
        return $supplier;
    }

    function deleteSupplierById($id)
    {
        $supplier = Supplier::find($id);
        $supplier->delete();
        return $supplier;
    }
    
}
