<?php

namespace App\Interface;

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
    public function checkOrderServiceById(int $service_id);
}
