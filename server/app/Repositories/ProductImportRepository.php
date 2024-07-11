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
        $status = $request->input('status');
        $id = $request->input('id');
        $product_import = ProductImport::query()->with("user_import");
        if ($query) {
            $product_import->whereHas('user_import', function ($queryBuilder) use ($query) {
                $queryBuilder->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%$query%"]);
            });
        }
        if ($status) {
            $product_import->where('status', $status);
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
