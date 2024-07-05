<?php

namespace App\Repositories;

use App\Interface\OrderDetailRepositoryInterface;
use App\Models\Device;
use App\Models\OrderDetail;
use App\Models\OrderDeviceDetail;
use App\Models\Product;

class OrderDetailRepository implements OrderDetailRepositoryInterface
{
    public function addProductsOrder($products, $order_id)
    {
        OrderDetail::where('order_id', $order_id)->delete();

        $listProducts = array_map(function ($product) use ($order_id) {
            $findPro = Product::where('active', $product['active'])->first();
            $newProduct['product_id'] = $findPro->id;
            $newProduct['order_id'] = $order_id;
            $newProduct['quantity'] = $product['quantity'];
            $findPro->quantity -= $product['quantity'];
            $findPro->save();
            return $newProduct;
        }, $products);

        foreach ($listProducts as $product) {
            OrderDetail::create($product);
        }

        return true;
    }

    public function addDevicesOrder($devices, $order_id)
    {
        OrderDeviceDetail::where('order_id', $order_id)->delete();

        $listDevices = array_map(function ($device) use ($order_id) {
            $newdevice['device_id'] = Device::where('active', $device['active'])->first()->id;
            $newdevice['order_id'] = $order_id;
            $newdevice['quantity'] = $device['quantity'];
            return $newdevice;
        }, $devices);

        foreach ($listDevices as $device) {
            OrderDeviceDetail::create($device);
        }

        return true;
    }
}
