<?php

namespace App\Repositories;

use App\Interface\ProductImpDetailInterface;
use App\Models\ProductImpDetail;

class ProductImpDetailRepository implements ProductImpDetailInterface
{

    function getAllProductImppDetail()
    {
        return ProductImpDetail::all();
    }

    function create(array $data)
    {
        return ProductImpDetail::create($data);
    }

    function updateProductImppDetailByActive($active, array $data)
    {
        $product_imp_detail = ProductImpDetail::where('active', $active)->get();
        $product_imp_detail->update($data);
        return $product_imp_detail;
    }


    public function getProductImppDetailByActive($active)
    {
        return ProductImpDetail::where('active', $active)->get();
    }

    public function deleteByActive($active)
    {
        $product_imp_detail = ProductImpDetail::where('active', $active)->get();
        $product_imp_detail->delete();
        return $product_imp_detail;
    }
}