<?php

namespace App\Repositories;

use App\Interface\ProductTypeRepositoryInterface;
use App\Http\Collections\CollectionCustom;
use App\Models\Product;
use App\Models\ProductType;

class ProductTypeRepository implements ProductTypeRepositoryInterface
{

    public function getProductTypeByActive($active)
    {
        return ProductType::where("active", $active)->first();
    }
    public function getAllType()
    {
        return ProductType::all();
    }
}
