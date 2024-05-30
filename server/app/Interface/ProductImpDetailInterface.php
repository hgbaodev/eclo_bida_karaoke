<?php

namespace App\Interface;

use App\Models\ProductImpDetail;


interface ProductImpDetailInterface
{
    function getAllProductImppDetail();
    public function getProductImppDetailByActive($active);
    function create(array $data);
    function updateProductImppDetailByActive($active, array $data);
    public function deleteByActive($active);
}