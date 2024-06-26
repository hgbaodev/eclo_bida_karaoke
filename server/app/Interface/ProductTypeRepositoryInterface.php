<?php

namespace App\Interface;


interface ProductTypeRepositoryInterface
{
    public function getAllType();
    public function getProductTypeByActive($active);
}
