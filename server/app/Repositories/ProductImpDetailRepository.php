<?php

namespace App\Repositories;

use App\Interface\ProductImppDetailInterface;
use App\Models\ProductImpDetail;

class ProductImpRepository implements ProductImppDetailInterface
{

    function getProductImppDetailAll()
    {
        return ProductImpDetail::all();
    }
    public function getProductImppDetailById($id)
    {
        return ProductImpDetail::find($id);
    }
    function create(array $data)
    {
        return ProductImpDetail::create($data);
    }

    function updateProductImppDetailById($id, array $data)
    {
        $supplier = ProductImpDetail::find($id);
        $supplier->update($data);
        return $supplier;
    }

    function deleteProductImppDetailById($id)
    {
        $supplier = ProductImpDetail::find($id);
        $supplier->delete();
        return $supplier;
    }
    public function getProductImppDetailByActive($active)
    {
        return ProductImpDetail::where('active', $active)->first();
    }

    public function deleteByActive($active)
    {
        $user = ProductImpDetail::where('active', $active)->first();
        $user->delete();
        return $user;
    }
}