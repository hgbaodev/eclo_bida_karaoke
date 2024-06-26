<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductRequest;
use App\Interface\ProductRepositoryInterface;
use App\Interface\ProductTypeRepositoryInterface;
use App\Repositories\ProductTypeRepository;
use Illuminate\Http\Request;

class ProductTypeController extends Controller
{


    protected $product_typeRepository;

    public function __construct(ProductTypeRepositoryInterface $product_typeRepository)
    {

        $this->product_typeRepository = $product_typeRepository;
    }

    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->product_typeRepository->getAllType());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(ProductRequest $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     */


    /**
     * Display the specified resource.
     */
    public function show(string $active)
    {
        return $this->sentSuccessResponse($this->product_typeRepository->getProductTypeByActive($active));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */


    /**
     * Remove the specified resource from storage.
     */
}
