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
        $type = $request->input('product_type');
        $id = $request->input('id');
        $product = Product::query()->with(['product_type']);
        if ($query) {
            $product->whereRaw("name LIKE '%$query%'");
        }
        if ($id) {
            $product->where('id', $id);
        }
        if ($type) {
            $product->whereHas('product_type', function ($query) use ($type) {
                $query->where("active", $type);
            });
        }
        if ($all && $all == true) {
            $product = $product->get();
        } else {
            $product = $product->paginate($perPage);
        }
        return new CollectionCustom($product);
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
    public function getProductByID($id)
    {
        return Product::where("id", $id)->first();
    }
}
