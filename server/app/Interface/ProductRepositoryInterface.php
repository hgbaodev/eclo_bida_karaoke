<?php

namespace App\Interface;


interface ProductRepositoryInterface
{
    public function getProducts($request);
    public function getAllProduct();
    public function create(array $data);
    public function getProductByActive($active);
    public function updateProductByActive($active, array $data);
    public function deleteByActive($active);
}