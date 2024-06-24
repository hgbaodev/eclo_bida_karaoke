<?php

namespace App\Interface;

use Illuminate\Http\Request;

interface KitchenOrderRepositoryInterface
{
    public function getKitchenOrders(Request $request);
    public function createKitchenOrder(array $data);
    public function getKitchenOrderByActive(string $active);
    public function updateKitchenOrderByActive(string $active);
    public function deleteKitchenOrderByActive(string $active);
}
