<?php

namespace App\Repositories;

use App\Enums\KitchenOrderEnum;
use App\Http\Resources\KitchenOrderResource;
use App\Interface\KitchenOrderRepositoryInterface;
use App\Models\KitchenOrder;

class KitchenOrderRepository implements KitchenOrderRepositoryInterface
{

    /**
     * @param Request $request
     * @return mixed
     */
    public function getKitchenOrders($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $status = $request->input('status');

        $orders = KitchenOrder::with('product', 'order')
            ->where('status', '<>', KitchenOrderEnum::DONE);

        if ($all) {
            $orders = $orders->get();
        } else {
            $orders = $orders->paginate($perPage);
        }
        return KitchenOrderResource::collection($orders);
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function createKitchenOrder(array $data)
    {
        return KitchenOrder::create($data);
    }

    /**
     * @param string $active
     * @return mixed
     */
    public function getKitchenOrderByActive(string $active)
    {
        $kitchenOrder = KitchenOrder::where('active', $active)->firstOrFail();
        return $kitchenOrder;
    }

    public function updateKitchenOrderByActive(string $active, array $data)
    {
        $kitchenOrder = KitchenOrder::where('active', $active)->firstOrFail();
        $kitchenOrder->update($data);
        return $kitchenOrder;
    }

    public function deleteKitchenOrderByActive(string $active)
    {
        $kitchenOrder = KitchenOrder::where('active', $active)->firstOrFail();
        $kitchenOrder->delete();
        return $kitchenOrder;
    }

    public function getTotalQuantityByProductAndOrderActive($productActive, $orderActive)
    {
        return KitchenOrder::whereHas('order', function ($query) use ($orderActive) {
            $query->where('active', $orderActive);
        })
            ->whereHas('product', function ($query) use ($productActive) {
                $query->where('active', $productActive);
            })
            ->sum('quantity');
    }

    public function deductQuantityFromNewestOrders($productActive, $orderActive, $quantity)
    {
        $orders = KitchenOrder::whereHas('order', function ($query) use ($orderActive) {
            $query->where('active', $orderActive);
        })
            ->whereHas('product', function ($query) use ($productActive) {
                $query->where('active', $productActive);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        foreach ($orders as $order) {
            if ($quantity <= 0) {
                break;
            }

            if ($order->quantity > $quantity) {
                $order->quantity -= $quantity;
                $order->save();
                $quantity = 0;
            } else {
                $quantity -= $order->quantity;
                $order->quantity = 0;
                $order->delete();
            }
        }
    }

    public function getKitchenOrdersByOrderId($id)
    {
        return KitchenOrder::where('order_id', $id)->get();
    }

    public function deleteKitchenOrderById($id)
    {
        $kitchenOrder = KitchenOrder::findOrFail($id);
        $kitchenOrder->delete();
    }
}
