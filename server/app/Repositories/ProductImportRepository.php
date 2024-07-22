<?php

namespace App\Repositories;

use App\Interface\ProductImportInterface;
use App\Models\ProductImport;
use App\Http\Collections\CollectionCustom;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Models\ProductImportDetail;


class ProductImportRepository implements ProductImportInterface
{
    public function getProductImports($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $product_import = ProductImport::query()->with("user_import");
        if ($query) {
            $product_import->whereHas('user_import', function ($queryBuilder) use ($query) {
                $queryBuilder->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%$query%"]);
            });
        }
        if ($id) {
            $product_import->where('id', $id);
        }
        $product_import->orderBy('import_day', 'desc');
        if ($all && $all == true) {
            $product_import = $product_import->get();
        } else {
            $product_import = $product_import->paginate($perPage);
        }
        return new CollectionCustom($product_import);
    }
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
        $product_import = ProductImport::where("active", $active)->first();
        $product_import->update($data);
        return $product_import;
    }
    public function getProductImportByActive($active)
    {
        return ProductImport::where("active", $active)->first();
    }
    public function deleteByActive($active)
    {
        $product_import = ProductImport::where("active", $active)->first();
        $product_import->delete();
        return $product_import;
    }
    public function deleteProductImportAndDetails($active)
    {
        DB::beginTransaction();

        try {
            $productImport = $this->getProductImportByActive($active);

            if (!$productImport) {
                throw new \Exception('Product import with active code ' . $active . ' is not found');
            }

            // Lấy danh sách các sản phẩm trong phiếu nhập
            $importDetails = ProductImportDetail::where('import_id', $productImport->id)->get();

            foreach ($importDetails as $detail) {
                $product = Product::find($detail->id_product);

                if ($product) {
                    if ($detail->quantity > $product->quantity) {
                        throw new \Exception('The quantity of the import is greater than the quantity of the product');
                    }

                    // Cập nhật số lượng sản phẩm trong kho
                    $product->quantity -= $detail->quantity;
                    $product->save();
                }

                // Xóa chi tiết phiếu nhập
                $detail->delete();
            }

            // Xóa phiếu nhập
            $productImport->delete();

            DB::commit();

            return ['status' => 'success', 'message' => $active . ' is deleted successfully'];
        } catch (\Exception $e) {
            DB::rollBack();
            return ['status' => 'error', 'message' => 'An error occurred: ' . $e->getMessage()];
        }
    }
}
