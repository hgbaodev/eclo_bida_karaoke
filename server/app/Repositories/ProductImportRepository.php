<?php

namespace App\Repositories;

use App\Interface\ProductImportInterface;
use App\Models\ProductImport;


class ProductImportRepository implements ProductImportInterface
{
    public function getAllProductImport()
    {
        return ProductImport::all();
    }
    public function create(array $data)
    {
        return ProductImport::create($data);
    }
    public function updateProductImportByActive($active, array $data)
    {
        $product_import = ProductImport::where("active", $active)->get();
        $product_import->update($data);
        return $product_import;
    }
    public function getProductImportByActive($active)
    {
        return ProductImport::where("active", $active)->get();
    }
    public function deleteByActive($active)
    {
        $product_import = ProductImport::where("active", $active)->get();
        $product_import->delete();
        return $product_import;
    }
}