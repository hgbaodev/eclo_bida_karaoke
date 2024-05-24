<?php

namespace App\Interface;

use App\Models\ProductImpDetail;


interface ProductImppDetailInterface
{
    public function getProductImppDetailAll();
    public function getProductImppDetailAllById($id);
    public function create(array $data);
    public function updateProductImppDetailById($id, array $data);
    public function deleteProductImppDetailById($id);
    public function getProductImppDetailByActive($active);
    public function deleteByActive($active);
}