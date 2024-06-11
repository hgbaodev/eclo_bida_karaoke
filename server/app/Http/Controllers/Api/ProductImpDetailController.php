<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductImport\ProductImpDetailRequest;
use Illuminate\Http\Request;
use App\Interface\ProductImpDetailInterface;
use App\Interface\ProductImportInterface;
use App\Interface\ProductRepositoryInterface;
use App\Interface\SupplierRepositoryInterface;

class ProductImpDetailController extends Controller
{
    protected $product_import_detail_Repository;
    protected $product_Repository;
    protected $supplier_Repository;
    protected $product_import_Repository;

    public function __construct(ProductImpDetailInterface $product_import_detail_Repository, ProductRepositoryInterface $product_Repository, ProductImportInterface $product_import_Repository, SupplierRepositoryInterface $supplier_Repository)
    {
        $this->product_import_detail_Repository = $product_import_detail_Repository;
        $this->product_Repository = $product_Repository;
        $this->product_import_Repository = $product_import_Repository;
        $this->supplier_Repository = $supplier_Repository;
    }
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->product_import_detail_Repository->getProductImports($request));
    }
    // public function show($active)
    // {
    //     return $this->sentSuccessResponse($this->product_import_Repository->getProductImpDetailtByActive($active));
    // }
    public function store(ProductImpDetailRequest $request)
    {
        $validated_data = $request->validated();

        $product_import = $this->product_import_Repository->getProductImportByActive($validated_data['product_imp_detail']);
        $product = $this->product_Repository->getProductByActive($validated_data['product']);
        $supplier = $this->supplier_Repository->getSupplierByActive($validated_data['supplier_detail']);
        if (!$product_import) {
            return $this->sentErrorResponse("Product import is not found", "error", 404);
        }
        if (!$product) {
            return $this->sentErrorResponse("Product is not found", "error", 404);
        }
        if (!$supplier) {
            return $this->sentErrorResponse("Supplier is not found", "error", 404);
        }
        $validated_data["import_id"] = $product_import->id;
        $validated_data["supplier_id"] = $product_import->id;
        $validated_data["id_product"] = $product_import->id;
        unset($validatedData['product_imp_detail']);
        unset($validatedData['product']);
        unset($validatedData['supplier_detail']);
        return $this->sentSuccessResponse($this->product_import_Repository->create($validated_data));
    }
}
