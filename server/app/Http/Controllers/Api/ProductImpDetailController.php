<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductImpDetailRequest;
use Illuminate\Http\Request;
use App\Interface\ProductImpDetailInterface;

class ProductImpDetailController extends Controller
{
    protected $product_import_Repository;


    public function __construct(ProductImpDetailInterface $product_import_Repository)
    {
        $this->product_import_Repository = $product_import_Repository;
    }
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->product_import_Repository->getProductImports($request));
    }
    // public function show($active)
    // {
    //     return $this->sentSuccessResponse($this->product_import_Repository->getProductImpDetailtByActive($active));
    // }
}
