<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductImportRequest;
use App\Interface\ProductImportInterface;
use Illuminate\Http\Request;

class ProductImportController extends Controller
{
    protected $product_import_Repository;


    public function __construct(ProductImportInterface $product_import_Repository)
    {
        $this->product_import_Repository = $product_import_Repository;
    }
    public function index()
    {
        return $this->sentSuccessResponse($this->product_import_Repository->getAllProductImport());
    }
    public function store(ProductImportRequest $request)
    {
        $validated_data = $request->validated();
        return $this->sentSuccessResponse($this->product_import_Repository->create($validated_data));
    }
    public function show($active)
    {
        return $this->sentSuccessResponse($this->product_import_Repository->getProductImportByActive($active));
    }
    public function update(ProductImportRequest $request, $active)
    {
        $validated_data = $request->validated();
        if (!$this->product_import_Repository->getProductImportByActive($active)) {
            return $this->sentErrorResponse($active . 'is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->product_import_Repository->updateProductImportByActive($active, $validated_data), " Updated successfully", 200);
    }
    public function destroy($active)
    {
        if (!$this->product_import_Repository->getProductImportByActive($active)) {
            return $this->sentErrorResponse($active . 'is not found', 'error', 404);
        }
        return $this->sentSuccessResponse($this->product_import_Repository->deleteByActive($active), $active . 'is deleted successfully', 200);
    }
}