<?php

namespace App\Interface;

interface OrderDetailRepositoryInterface
{

    /**
     * @param $request requestedProducts
     * @param $active currentOrder
     * @return mixed
     */
    public function addProductsOrder($products, $order_id);
    public function addDevicesOrder($devices, $order_id);
}
