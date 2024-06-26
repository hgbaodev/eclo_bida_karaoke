<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\currentOrder;
use App\Interface\OrderRepositoryInterface;
use App\Interface\requestedProduct;
use App\Models\Order;
use App\Models\Product;
use App\Notifications\OrderNotification;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class OrderRepository implements OrderRepositoryInterface
{

    /**
     * @param $request
     * @param $active
     * @return mixed
     */

    public function getOders($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $status = $request->input('status');

        $orders = Order::query();
        $orders->latest();
        if ($all) {
            $orders = $orders->get();
        } else {
            $orders = $orders->paginate($perPage);
        }
        return new CollectionCustom($orders);
    }

    public function getOrderByActive(string $active)
    {
        $order = Order::with(['service.price', 'user', 'customer', 'orderdetails.product'])->where('active', $active)->first();

        if (!$order) {
            return null;
        }

        if ($order['orderdetails']->isEmpty()) {
            return $order;
        }

        $order['products'] = $order['orderdetails']->map(function ($orderdetail) {
            $order_detail['active'] = $orderdetail->product->active;
            $order_detail['quantity'] = $orderdetail->quantity;
            $order_detail['image'] = $orderdetail->product->image ?? 'default_image.png'; // Added a fallback for missing images
            $order_detail['name'] = $orderdetail->product->name;
            $order_detail['selling_price'] = $orderdetail->product->selling_price;
            return $order_detail;
        });

        return $order;
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

    public function checkOrderServiceById(int $service_id)
    {
        $order = Order::where('service_id', $service_id)->where('checkout_time', null)->first();
        return $order;
    }

    public function markOrderRequestAsRead(Request $request)
    {
        $id = $request->id;
        $notification = DatabaseNotification::where('id', $id)->firstOrFail();
        if ($notification) {
            $notification->markAsRead();
            return $notification;
        }
    }
}
