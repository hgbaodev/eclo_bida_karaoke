<?php

namespace App\Interface;

use App\Models\ProductImpDetail;


interface ProductImpDetailInterface
{
    public function getProductImports($request);
    function getAllProductImppDetail();
    function create(array $data);
    function getProductImpDetailtByActive($active);
    function getProductImportDetailByIdProdutImport($id);
    function getProductImportDetailById($id);
    function sumCost($active);
}
