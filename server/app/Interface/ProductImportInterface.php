<?php

namespace App\Interface;


interface ProductImportInterface
{
    public function getAllProductImport();
    public function create(array $data);
    public function getProductImportByActive($active);
    public function updateProductImportByActive($active, array $data);
    public function deleteByActive($active);
}