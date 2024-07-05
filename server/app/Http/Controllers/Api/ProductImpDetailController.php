<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductImportDetail\ProductImpDetailRequest;
use Illuminate\Http\Request;
use App\Interface\ProductImpDetailInterface;
use App\Interface\ProductImportInterface;
use App\Interface\ProductRepositoryInterface;
use App\Interface\SupplierRepositoryInterface;
use App\Models\ProductImport;
use Exception;

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
        try {
            $validated_data = $request->validated();
            $selling_price = $request->input('selling_price');
            $cost_price = $request->input('cost_price');
            $quantity = $request->input('quantity');
            $product_import = $this->product_import_Repository->getProductImportByActive($validated_data['import']);
            // dd($product_import);
            $product = $this->product_Repository->getProductByActive($validated_data['product']);
            // dd($product->id);
            $supplier = $this->supplier_Repository->getSupplierByActive($validated_data['supplier']);
            if (!$product_import) {
                return $this->sentErrorResponse("Product import is not found", "error", 404);
            }
            if (!$product) {
                return $this->sentErrorResponse("Product is not found", "error", 404);
            }
            if (!$supplier) {
                return $this->sentErrorResponse("Supplier is not found", "error", 404);
            }
            if ($cost_price >= $selling_price) {
                return $this->sentErrorResponse("Selling price must be larger than cost price", "error", 404);
            }
            $validated_data["import_id"] = $product_import->id;
            $validated_data["supplier_id"] = $supplier->id;
            $validated_data["id_product"] = $product->id;
            unset($validated_data['import']);
            unset($validated_data['product']);
            unset($validated_data['supplier']);


            $product->quantity += $quantity;
            $product->selling_price = $selling_price;
            $product->save();

            return $this->sentSuccessResponse($this->product_import_detail_Repository->create($validated_data));
        } catch (\Exception $e) {

            return $this->sentErrorResponse("Product is already imported", "error", 404);
        }
    }
    // public function sum(string $active)
    // {

    //     $product_import = $this->product_import_Repository->getProductImportByActive($active);
    //     $sum = $this->product_import_detail_Repository->sumCost($product_import->id);
    //     // return $this->sentSuccessResponse($this->product_import_detail_Repository->sumCost($product_import));
    //     return response()->json(['sum' => $sum]);
    // }
    public function updateTotalCost($active)
    {
        // Lấy đối tượng Import theo ID
        $import = ProductImport::find($active);

        if (!$import) {
            return response()->json(['error' => 'Import not found.'], 404);
        }

        // Gọi phương thức updateTotalCost() để cập nhật total_cost
        $import->updateTotalCost();
        return response()->json(['success' => 'Total cost updated successfully.', 'total_cost' => $import->total_cost]);
    }
}
