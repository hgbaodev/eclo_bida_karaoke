<?php

namespace App\Interface;

use Illuminate\Http\Request;

interface KitchenOrderRepositoryInterface
{
    public function getKitchenOrders(Request $request);
    public function createKitchenOrder(array $data);
    public function getKitchenOrderByActive(string $active);
    public function updateKitchenOrderByActive(string $active, array $data);
    public function deleteKitchenOrderByActive(string $active);
    public function getTotalQuantityByProductAndOrderActive(string $productActive, string $orderActive);
    public function deductQuantityFromNewestOrders(string $productActive, string $orderActive, int $quantity);
    public function getKitchenOrdersByOrderId(int $id);
    public function deleteKitchenOrderById(int $id);

}
