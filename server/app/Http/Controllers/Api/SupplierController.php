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
    public function index()
    {
        return $this->sentSuccessResponse($this->supplierRepository->getAllSuppliers());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show($id)
    {
        return $this->sentSuccessResponse($this->supplierRepository->getSupplierById($id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request,$id)
    {
        $validated_data = $request->validated();
        if(!$this->supplierRepository->getSupplierById($id)){
            return $this->sentErrorResponse("Supllier ".$id.' is not found', "error", 400);
        }
        return $this->sentSuccessResponse($this->supplierRepository->updateSupplierById($id, $validated_data), 'The supplier '. $id. ' has been updated!!!', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if(!$this->supplierRepository->getSupplierById($id)){
            return $this->sentErrorResponse("Supllier ".$id.' is not found', "error", 400);
        }
        return $this->sentSuccessResponse($this->supplierRepository->deleteSupplierById($id), 'The supplier '.$id.' has been deleted!!!');
    }
}
