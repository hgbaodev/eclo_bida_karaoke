<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\OrderRepositoryInterface;
use App\Models\Order;
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

        $orders = Order::with(['service', 'customer'])->where('checkout_time', '!=', null);
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
        $order = Order::with(['service.price', 'user', 'customer', 'orderdetails.product', 'orderdevicedetails.device'])->where('active', $active)->first();

        if (!$order) {
            return null;
        }

        $order['products'] = [];

        $order['products'] = $order['orderdetails']->map(function ($orderdetail) {
            $order_detail['active'] = $orderdetail->product->active;
            $order_detail['quantity'] = $orderdetail->quantity;
            $order_detail['image'] = $orderdetail->product->image; // Added a fallback for missing images
            $order_detail['name'] = $orderdetail->product->name;
            $order_detail['selling_price'] = $orderdetail->product->selling_price;
            $order_detail['quantity_stock'] = $orderdetail->product->quantity;
            return $order_detail;
        });

        $order['devices'] = [];

        $order['devices'] = $order['orderdevicedetails']->map(function ($orderdevice) {
            $order_device['active'] = $orderdevice->device->active;
            $order_device['image'] = $orderdevice->device->image;
            $order_device['quantity'] = $orderdevice->quantity;
            $order_device['name'] = $orderdevice->device->name;
            $order_device['selling_price'] = $orderdevice->device->value;
            $order_device['quantity_stock'] = $orderdevice->device->quantity;
            return $order_device;
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

    public function findOrderByActive(string $active)
    {
        return Order::where('active', $active)->first();
    }

    public function payOrder($request)
    {
    }

    public function getInvoices($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');

        $orders = Order::with(['service', 'customer'])->where('checkout_time', '!=', null);
        $orders->latest();
        if ($all) {
            $orders = $orders->get();
        } else {
            $orders = $orders->paginate($perPage);
        }
        return new CollectionCustom($orders);
    }
}
