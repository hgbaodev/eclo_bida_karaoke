<?php

namespace App\Repositories;

use App\Interface\currentOrder;
use App\Interface\OrderRepositoryInterface;
use App\Interface\requestedProduct;
use App\Models\Product;
use App\Notifications\OrderNotification;

class OrderRepository implements OrderRepositoryInterface
{

    /**
     * @param $request
     * @param $active
     * @return mixed
     */
    public function addProductsToOrder($request, $active)
    {
        $product = Product::where('active', $active)->firstOrFail();
        return $product->notify(new OrderNotification($request->requestedProducts, $active));
    }
}
