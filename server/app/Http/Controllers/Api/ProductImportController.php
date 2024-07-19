<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductImport\ProductImportRequest;
use App\Interface\ProductImportInterface;
use App\Interface\ProductRepositoryInterface;
use App\Interface\ProductImpDetailInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ProductImport;
use App\Interface\SupplierRepositoryInterface;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductImportController extends Controller
{
    protected $product_import_Repository;
    protected $product_Repository;
    protected $product_import_detail_Repository;
    protected $supplier_Repository;
    protected $user_Repository;
    public function __construct(ProductImportInterface $product_import_Repository, ProductRepositoryInterface $product_Repository, ProductImpDetailInterface $product_import_detail_Repository, SupplierRepositoryInterface $supplier_Repository, UserRepository $user_Repository)
    {
        $this->product_import_Repository = $product_import_Repository;
        $this->product_Repository = $product_Repository;
        $this->product_import_detail_Repository = $product_import_detail_Repository;
        $this->supplier_Repository = $supplier_Repository;
        $this->user_Repository = $user_Repository;
    }
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->product_import_Repository->getProductImports($request));
    }
    public function store(ProductImportRequest $request)
    {
        try {
            $validated_data = $request->validated();
            $userId = Auth::id();
            // $user = $this->user_Repository->getUserByActive($validated_data['user_import']);
            // $validated_data["user_id"] = $user->id;
            // Tạo phiếu nhập
            $importData = [
                'create_time' => $validated_data['create_time'],
                'receive_time' => $validated_data['receive_time'],
                'user_id' => $userId
                // Thêm các trường khác nếu cần thiết
            ];
            $product_import = $this->product_import_Repository->create($importData);

            foreach ($validated_data['products'] as $product_data) {
                $cost_price = $product_data['cost_price'];
                $quantity = $product_data['quantity'];
                $product = $this->product_Repository->getProductByActive($product_data['product']);
                // $supplier = $this->supplier_Repository->getSupplierByActive($product_data['supplier']);

                if (!$product) {
                    return $this->sentErrorResponse("Product is not found", "error", 404);
                }
                // if (!$supplier) {
                //     return $this->sentErrorResponse("Supplier is not found", "error", 404);
                // }


                $product_data["import_id"] = $product_import->id;
                // $product_data["supplier_id"] = $supplier->id;
                $product_data["id_product"] = $product->id;
                unset($product_data['product']);
                // unset($product_data['supplier']);
                $product->quantity += $quantity;
                $product->save();

                $this->product_import_detail_Repository->create($product_data);
            }

            return $this->sentSuccessResponse("Products imported successfully");
        } catch (\Exception $e) {
            Log::error("Error importing products", ['exception' => $e]);
            return $this->sentErrorResponse("An error occurred while importing products", "error", 500);
        }
    }
    public function show($active)
    {
        return $this->sentSuccessResponse($this->product_import_Repository->getProductImportByActive($active));
    }
    public function update(ProductImportRequest $request, $active)
    {
        $validated_data = $request->validated();
        $product_import = $this->product_import_Repository->getProductImportByActive($active);

        if (!$product_import) {
            return $this->sentErrorResponse($active . 'is not found', "error", 404);
        }


        return $this->sentSuccessResponse($this->product_import_Repository->updateProductImportByActive($active, $validated_data), " Updated successfully", 200);
    }
    public function destroy($active)
    {
        DB::beginTransaction();

        try {
            $productImport = $this->product_import_Repository->getProductImportByActive($active);

            if (!$productImport) {
                Log::error("Product import with active code $active is not found");
                return $this->sentErrorResponse('Product import with active code ' . $active . ' is not found', 'error', 404);
            }

            Log::info("Found product import: ", ['productImport' => $productImport]);

            // Lấy danh sách các sản phẩm trong phiếu nhập
            $importDetails = $this->product_import_detail_Repository->getProductImportDetailByIdProdutImport($productImport->id);

            foreach ($importDetails as $detail) {
                $product = $this->product_Repository->getProductByID($detail->product_id);

                if ($product) {
                    Log::info("Processing product: ", ['product' => $product, 'detail' => $detail]);

                    if ($detail->quantity > $product->quantity) {
                        Log::error("The quantity of the import is greater than the quantity of the product", ['detail' => $detail, 'product' => $product]);
                        return $this->sentErrorResponse('The quantity of the import is greater than the quantity of the product', 'error', 400);
                    }

                    // Cập nhật số lượng sản phẩm trong kho
                    $product->quantity -= $detail->quantity;
                    $product->save();

                    Log::info("Updated product quantity", ['product' => $product]);
                } else {
                    Log::error("Product not found for detail", ['detail' => $detail]);
                }

                // Xóa chi tiết phiếu nhập
                $this->product_import_detail_Repository->deleteByID($detail->id);
                Log::info("Deleted product import detail", ['detail' => $detail]);
            }

            // Xóa phiếu nhập
            $this->product_import_Repository->deleteByActive($active);
            Log::info("Deleted product import", ['active' => $active]);

            DB::commit();

            return $this->sentSuccessResponse(null, $active . ' is deleted successfully', 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error occurred while deleting product import", ['exception' => $e]);
            return $this->sentErrorResponse('An error occurred while deleting the product import: ' . $e->getMessage(), 'error', 500);
        }
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
