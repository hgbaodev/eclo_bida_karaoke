<?php

namespace App\Interface;

use Illuminate\Http\Request;

interface OrderRepositoryInterface
{

    /**
     * @param $request requestedProducts
     * @param $active currentOrder
     * @return mixed
     */
    public function getOders($request);
    public function createOrder(array $data);
    public function getOrderByActive(string $active);
    public function updateOrderByActive(string $active, array $data);
    public function deleteOrderByActive(string $active);
    public function markOrderRequestAsRead(Request $request);
    public function payOrder($request);
    public function getInvoices($request);
}
