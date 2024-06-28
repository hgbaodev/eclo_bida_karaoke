<?php

namespace App\Repositories;

use App\Interface\ProductRepositoryInterface;
use App\Http\Collections\CollectionCustom;
use App\Models\Product;
use App\Models\ProductImportDetail;

use Illuminate\Support\Facades\DB;

class ProductRepository implements ProductRepositoryInterface
{
    public function getProducts($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $product = Product::query()->with(['product_type']);
        if ($query) {
            $product->whereRaw("name LIKE '%$query%'");
        }
        if ($id) {
            $product->where('id', $id);
        }
        $product = $product->leftJoin('product_import_details', 'products.id', '=', 'product_import_details.id_product')
            ->leftJoin('product_imports', 'product_import_details.import_id', '=', 'product_imports.id')
            ->select('products.*', DB::raw('IFNULL(SUM(product_import_details.quantity), 0) as total_quantity'))
            ->groupBy('products.id', 'products.name', 'products.image', 'products.selling_price', 'products.active', 'products.id_type', 'products.quantity')
            ->orderBy(DB::raw('MAX(product_imports.receive_time)'), 'desc');
        if ($all && $all == true) {
            $products = $product->get();
        } else {
            $products = $product->paginate($perPage);
        }
        foreach ($products as $product) {
            // Cập nhật số lượng sản phẩm
            $product->quantity = $product->total_quantity;

            // Truy vấn để lấy giá bán từ phiếu nhập có thời gian sớm nhất
            $lastestSellingPrice = ProductImportDetail::query()
                ->join('product_imports', 'product_import_details.import_id', '=', 'product_imports.id')
                ->where('product_import_details.id_product', $product->id)
                ->orderBy('product_imports.receive_time', 'desc')
                ->value('product_import_details.selling_price');

            // Cập nhật giá bán từ phiếu nhập có thời gian sớm nhất
            if ($lastestSellingPrice !== null) {
                $product->selling_price = $lastestSellingPrice;
            }

            $product->save();
        }
        return new CollectionCustom($products);
    }
    public function getAllProduct()
    {
        return Product::all();
    }
    public function create(array $data)
    {
        return Product::create($data);
    }
    public function getProductByActive($active)
    {
        return Product::where("active", $active)->first();
    }
    public function updateProductByActive($active, array $data)
    {
        $product = Product::where("active", $active)->first();
        $product->update($data);
        return $product;
    }
    public function deleteByActive($active)
    {
        $product = Product::where("active", $active)->first();
        $product->delete();
        return $product;
    }
}
