<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Interface\ProductRepositoryInterface;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    protected $productRepository;


    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->productRepository->getProducts($request));
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
    public function store(ProductRequest $request)
    {
        $validated = $request->validated();
        return $this->sentSuccessResponse($this->productRepository->create($validated));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $active)
    {
        return $this->sentSuccessResponse($this->productRepository->getProductByActive($active));
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
    public function update(ProductRequest $request, string $active)
    {
        $validated_data = $request->validated();
        if (!$this->productRepository->getProductByActive($active)) {
            return $this->sentErrorResponse('product' . $active . 'is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->productRepository->updateProductByActive($active, $validated_data), " product updated successfully", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $active)
    {

        if (!$this->productRepository->getProductByActive($active)) {
            return $this->sentErrorResponse('product' . $active . 'is not found', 'error', 404);
        }
        return $this->sentSuccessResponse($this->productRepository->deleteByActive($active), 'product' . $active . 'is deleted successfully', 200);
    }
}
