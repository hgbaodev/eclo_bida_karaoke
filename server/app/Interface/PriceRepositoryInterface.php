<?php

namespace App\Interface;

interface PriceRepositoryInterface
{
    public function getPrices($request);

    public function getPriceByActive($active);

    public function createPrice(array $data);

    public function updatePriceByActive($active, array $data);

    public function deletePriceByActive($active);
}
