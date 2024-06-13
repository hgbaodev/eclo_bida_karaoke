<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\currentOrder;
use App\Interface\OrderRepositoryInterface;
use App\Interface\requestedProduct;
use App\Models\Order;
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

    public function getOders($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $status = $request->input('status');

        $orders = Order::query();
        $orders->latest();
        if($all){
            $orders = $orders->get();
        } else {
            $orders = $orders->paginate($perPage);
        }
        return new CollectionCustom($orders);
    }

    public function getOrderByActive(string $active)
    {
        return Order::where('active', $active)->firstOrFail();
    }

    public function createOrder(array $data)
    {
        return Order::create($data);
    }

    public function updateOrderByActive(string $active, array $data)
    {
        $order = Order::where('active', $active)->firstOrFail();
        $order->update($data);
        return $order;
    }

    public function deleteOrderByActive($active)
    {
        $order = Order::where('active', $active)->firstOrFail();
        $order->delete();
        return $order;
    }
}
