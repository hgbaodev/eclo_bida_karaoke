<?php

namespace App\Interface;

use App\Models\Product;

interface ProductRepositoryInterface
{
    public function getProducts($request);
    public function getAllProduct();
    public function create(array $data);
    public function getProductByActive($active);
    public function getProductByID($id);
    public function updateProductByActive($active, array $data);
    public function deleteByActive($active);
    public function save(Product $product);
}
