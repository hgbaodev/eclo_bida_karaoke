<?php

namespace App\Interface;

interface ProductImpDetailInterface
{
    public function getProductImports($request);
    function getAllProductImppDetail();
    function create(array $data);
    function getProductImpDetailtByActive($active);
    function getProductImportDetailByIdProdutImport($id);
    function getProductImportDetailById($id);
    function sumCost($active);
    public function deleteByID($id);
}
