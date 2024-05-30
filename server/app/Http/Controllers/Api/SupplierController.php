<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Supplier\StoreSupplierRequest;
use App\Http\Requests\Supplier\UpdateSupplierRequest;
use App\Interface\SupplierRepositoryInterface;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{

    protected $supplierRepository;
    public function __construct(SupplierRepositoryInterface $supplierRepository)
    {
        $this->supplierRepository = $supplierRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->supplierRepository->getAllSuppliers($request));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSupplierRequest $request)
    {
        $validated_data = $request->validated();
        return $this->sentSuccessResponse($this->supplierRepository->createSupplier($validated_data), "The supplier has been created successfully!!!", 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($active)
    {
        return $this->sentSuccessResponse($this->supplierRepository->getSupplierByActive($active));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, $active)
    {
        $validated_data = $request->validated();
        if(!$this->supplierRepository->getSupplierByActive($active)){
            return $this->sentErrorResponse("Supllier ".$active.' is not found', "error", 400);
        }
        $updatedData = $this->supplierRepository->updateSupplierByActive($active, $validated_data);
        return $this->sentSuccessResponse($updatedData, 'The supplier '. $active. ' has been updated!!!', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($active)
    {
        if(!$this->supplierRepository->getSupplierByActive($active)){
            return $this->sentErrorResponse("Supllier ".$active.' is not found', "error", 400);
        }
        return $this->sentSuccessResponse($this->supplierRepository->deleteSupplierByActive($active), 'The supplier '.$active.' has been deleted!!!');
    }
}
