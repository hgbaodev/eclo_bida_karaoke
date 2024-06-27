<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductRequest;
use App\Interface\ProductRepositoryInterface;
use App\Interface\ProductTypeRepositoryInterface;
use App\Repositories\ProductTypeRepository;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    protected $productRepository;
    protected $product_typeRepository;

    public function __construct(ProductRepositoryInterface $productRepository, ProductTypeRepositoryInterface $product_typeRepository)
    {
        $this->productRepository = $productRepository;
        $this->product_typeRepository = $product_typeRepository;
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
        // $validated = $request->validated();
        // return $this->sentSuccessResponse($this->productRepository->create($validated), "product is created successfully", 200);
        $validated_data = $request->validated();
        // dd($validated_data);
        // dd($product->id);
        $product_type = $this->product_typeRepository->getProductTypeByActive($validated_data['product_type']);
        if (!$product_type) {
            return $this->sentErrorResponse("Type is not found", "error", 404);
        }
        $validated_data["id_type"] = $product_type->id;
        unset($validated_data['product_type']);

        return $this->sentSuccessResponse($this->productRepository->create($validated_data));
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
        $product_type = $this->product_typeRepository->getProductTypeByActive($validated_data['product_type']);
        if (!$product_type) {
            return $this->sentErrorResponse("Type is not found", "error", 404);
        }
        $validated_data["id_type"] = $product_type->id;
        unset($validated_data['product_type']);
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
