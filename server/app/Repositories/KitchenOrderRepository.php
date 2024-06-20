<?php

namespace App\Repositories;

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

        $orders = KitchenOrder::with('product');
        $orders->latest();
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
        // TODO: Implement getKitchenOrderByActive() method.
    }

    /**
     * @param string $active
     * @return mixed
     */
    public function updateKitchenOrderByActive(string $active)
    {
        // TODO: Implement updateKitchenOrderByActive() method.
    }

    /**
     * @param string $active
     * @return mixed
     */
    public function deleteKitchenOrderByActive(string $active)
    {
        // TODO: Implement deleteKitchenOrderByActive() method.
    }
}
