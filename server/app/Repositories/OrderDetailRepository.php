<?php

namespace App\Repositories;

use App\Interface\OrderDetailRepositoryInterface;
use App\Models\OrderDetail;
use App\Models\Product;

class OrderDetailRepository implements OrderDetailRepositoryInterface
{
    public function addProductsOrder($products, $order_id)
    {
        OrderDetail::where('order_id', $order_id)->delete();

        $listProducts = array_map(function ($product) use ($order_id) {
            $newProduct['product_id'] = Product::where('active', $product['active'])->first()->id;
            $newProduct['order_id'] = $order_id;
            $newProduct['quantity'] = $product['quantity'];
            return $newProduct;
        }, $products);

        foreach ($listProducts as $product) {
            OrderDetail::create($product);
        }

        return true;
    }
}
