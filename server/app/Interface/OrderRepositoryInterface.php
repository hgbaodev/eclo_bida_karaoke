<?php

namespace App\Interface;

interface OrderRepositoryInterface{

    /**
     * @param $request requestedProducts
     * @param $active currentOrder
     * @return mixed
     */
    public function addProductsToOrder($request, $active);
}
