<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductImport\ProductImportRequest;
use App\Interface\ProductImportInterface;
use Illuminate\Http\Request;
use App\Models\ProductImport;

class ProductImportController extends Controller
{
    protected $product_import_Repository;


    public function __construct(ProductImportInterface $product_import_Repository)
    {
        $this->product_import_Repository = $product_import_Repository;
    }
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->product_import_Repository->getProductImports($request));
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
    public function updateTotalCost($active)
    {
        // Lấy đối tượng Import theo ID
        $import1 = $this->product_import_Repository->getProductImportByActive($active);
        $import = ProductImport::find($import1->id);
        if (!$import) {
            return response()->json(['error' => 'Import not found.'], 404);
        }

        // Gọi phương thức updateTotalCost() để cập nhật total_cost
        $import->updateTotalCost();

        return response()->json(['success' => 'Total cost updated successfully.', 'total_cost' => $import->total_cost]);
    }
}