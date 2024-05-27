<?php

namespace App\Repositories;

use App\Interface\ProductRepositoryInterface;
use App\Models\Product;


class ProductRepository implements ProductRepositoryInterface
{
    public function getAllProduct()
    {
        return Product::all();
    }
    public function create(array $data)
    {
        return Product::create($data);
    }
    public function getProductByActive($active)
    {
        return Product::where("active", $active)->get();
    }
    public function updateProductByActive($active, array $data)
    {
        $product = Product::where("active", $active)->first();
        $product->update($data);
        return $product;
    }
    public function deleteByActive($active)
    {
        $product = Product::where("active", $active)->get();
        $product->delete($active);
        return $product;
    }
}