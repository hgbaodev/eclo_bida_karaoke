<?php

namespace App\Interface;

use App\Models\ProductImport;
use App\Models\User;

interface ProductImportInterface
{
    public function getProductImport($request);
    public function create(array $data);
    public function findProductImportById($id);
    public function save(ProductImport $productImport);
    public function updateProductImportById($id, array $data);
    public function deletePProductImportById($id);
    public function getProductImportByActive($active);
    public function deleteByActive($active);
}