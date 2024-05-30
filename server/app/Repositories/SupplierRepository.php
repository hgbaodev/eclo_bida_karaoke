<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\SupplierRepositoryInterface;
use App\Models\Supplier;

class SupplierRepository implements SupplierRepositoryInterface {

    function getAllSuppliers($request) {

        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $name = $request->input('name');
        $address = $request->input('address');
        $phone = $request->input('phone');
        $query = $request->input('query');
        $status = $request->input('status');
        $suppliers = Supplier::query();
        $suppliers->latest();

        if ($query) {
            $suppliers->whereRaw("CONCAT(name, ' ', phone,' ', address) LIKE '%$query%'");
        }
        if ($status) {
            $suppliers->where('status', $status);
        }
        if($all){
            $suppliers = $suppliers->get();
        } else {
            $suppliers = $suppliers->paginate($perPage);
        }
        return new CollectionCustom($suppliers);
    }

    function getSupplierById($id)
    {
        return Supplier::find($id);
    }
    function getSupplierByActive($active)
    {
        return Supplier::where('active', $active)->firstOrFail();
    }
    function createSupplier(array $data)
    {
        return Supplier::create($data);
    }

    function updateSupplierByActive($active, array $data)
    {
        $supplier = Supplier::where('active', $active)->firstOrFail();
        $supplier->update($data);
        return $supplier;
    }

    function updateSupplierById($id, array $data)
    {
        $supplier = Supplier::where('id', $id)->firstOrFail();
        $supplier->update($data);
        return $supplier;
    }

    function deleteSupplierById($id)
    {
        $supplier = Supplier::find($id);
        $supplier->delete();
        return $supplier;
    }

    function deleteSupplierByActive($active)
    {
        $supplier = Supplier::where('active', $active)->firstOrFail();
        $supplier->delete();
        return $supplier;
    }

}
