<?php

namespace App\Repositories;

use App\Interface\ProductImpDetailInterface;
use App\Http\Collections\CollectionCustom;
use App\Models\ProductImportDetail;
use App\Models\ProductImport;
use App\Models\Supplier;

class ProductImpDetailRepository implements ProductImpDetailInterface
{
    public function getProductImports($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $product_import_detail_query = ProductImportDetail::query()->with(['product_imp_detail', 'product', 'supplier_detail']);
        if ($query) {
            $product_import_detail_query->whereRaw("quantity LIKE '%$query%'");
        }
        if ($id) {
            $product_import_detail_query->where('id', $id);
        }
        if ($all && $all == true) {
            $product_import_detail_query = $product_import_detail_query->get();
        } else {
            $product_import_detail_query = $product_import_detail_query->paginate($perPage);
        }
        return new CollectionCustom($product_import_detail_query);
    }

    function getAllProductImppDetail()
    {
        return ProductImportDetail::all();
    }

    function create(array $data)
    {
        return ProductImportDetail::create($data);
    }
    function getProductImpDetailtByActive($active)
    {
        return ProductImportDetail::where("active", $active)->first();
    }
}
