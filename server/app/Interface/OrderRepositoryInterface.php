<?php

namespace App\Interface;

use Illuminate\Http\Request;

interface OrderRepositoryInterface
{
    public function getOders($request);
    public function createOrder(array $data);
    public function getOrderByActive(string $active);
    public function updateOrderByActive(string $active, array $data);
    public function deleteOrderByActive(string $active);
    public function checkOrderServiceById(int $service_id);
    public function markOrderRequestAsRead(Request $request);
}
