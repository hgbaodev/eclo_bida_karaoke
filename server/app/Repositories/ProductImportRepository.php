<?php

namespace App\Repositories;

use App\Interface\ProductImportInterface;
use App\Models\ProductImport;
use App\Http\Collections\CollectionCustom;


class ProductImportRepository implements ProductImportInterface
{
    public function getProductImports($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $product_import = ProductImport::query();
        if ($query) {
            $product_import->whereRaw("create_time LIKE '%$query%'")
                ->whereRaw("recieve_time LIKE '%$query%'")
                ->whereRaw("status LIKE '%$query%'");
        }
        if ($id) {
            $product_import->where('id', $id);
        }
        $product_import->orderBy('receive_time', 'desc');
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
}
