<?php

namespace App\Http\Controllers\Api;

use App\Models\Customer;
use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\StoreCustomerRequest;
use App\Http\Requests\Customer\UpdateCustomerRequest;
use App\Interface\CustomerRepositoryInterface;
use Illuminate\Http\Request;

class CustomerController extends Controller

{
    protected $customerRepository;

    public function __construct(CustomerRepositoryInterface $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->sentSuccessResponse($this->customerRepository->getAllCustomers());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $validated_data = $request->validated();
        return $this->sentSuccessResponse($this->customerRepository->createCustomer($validated_data), 'The customer has been created successfully!!!', 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->sentSuccessResponse($this->customerRepository->getCustomerById($id));
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, $id){
        $validatedData = $request->validated();
        if(!$this->customerRepository->getCustomerById($id)){
            return $this->sentErrorResponse('Customer not found', 'error', 404);
        }
        return $this->sentSuccessResponse($this->customerRepository->updateCustomerById($id, $validatedData));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if(!$this->customerRepository->getCustomerById($id)){
            return $this->sentErrorResponse('Customer '.$id. ' is not found', 'error', 404);
        }
        return $this->sentSuccessResponse($this->customerRepository->deleteCustomerById($id), 'customer '.$id.' is deleted', 200);
    }
}
