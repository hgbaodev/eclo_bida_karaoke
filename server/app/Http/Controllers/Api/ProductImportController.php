<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductImport\ProductImportRequest;
use App\Interface\ProductImportInterface;
use App\Interface\ProductRepositoryInterface;
use App\Interface\ProductImpDetailInterface;
use Illuminate\Http\Request;
use App\Models\ProductImport;

class ProductImportController extends Controller
{
    protected $product_import_Repository;
    protected $product_Repository;
    protected $product_import_detail_Repository;
    public function __construct(ProductImportInterface $product_import_Repository, ProductRepositoryInterface $product_Repository, ProductImpDetailInterface $product_import_detail_Repository)
    {
        $this->product_import_Repository = $product_import_Repository;
        $this->product_Repository = $product_Repository;
        $this->product_import_detail_Repository = $product_import_detail_Repository;
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
        $product_import = $this->product_import_Repository->getProductImportByActive($active);
        $product_import_id = $this->product_import_detail_Repository->getProductImportDetailByIdProdutImport($product_import->id);
        foreach ($product_import_id as $item) {
            $product = $this->product_Repository->getProductByID($item->id_product);
            $product_import_detail = $this->product_import_detail_Repository->getProductImpDetailtByActive($item->active);
            $initial_quantity = $product_import_detail->quantity;
            $initial_selling_price = $product_import_detail->selling_price;
            if ($product_import->status === 'A') {
                $product->quantity += $product_import_detail->quantity;
                $product->selling_price = $product_import_detail->selling_price;
                $product->save();
            } else if ($product_import->status === 'D') {
                $product->quantity = $initial_quantity;
                $product->selling_price = $initial_selling_price;
                $product->save();
            }
        }


        if (!$product_import) {
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
