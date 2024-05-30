<?php

namespace App\Repositories;

use App\Interface\ProductRepositoryInterface;
use App\Http\Collections\CollectionCustom;
use App\Models\Product;


class ProductRepository implements ProductRepositoryInterface
{
    public function getProducts($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $product = Product::query();
        if ($query) {
            $product->where("id", "LIKE", "%$query%")
                ->orWhere("name", "LIKE", "%$query%");
        }
        if ($id) {
            $product->where('id', $id);
        }
        if ($all && $all == true) {
            $staffs = $product->get();
        } else {
            $staffs = $product->paginate($perPage);
        }
        return new CollectionCustom($staffs);
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
        return Product::where("active", $active)->get();
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
