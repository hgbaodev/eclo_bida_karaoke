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
    public function index(Request $request)
    {
        $data = $this->customerRepository->getCustomers($request);
        return $this->sentSuccessResponse($data);
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
    public function show($active)
    {
        $returnedData = $this->customerRepository->getCustomerByActive($active);
        return $this->sentSuccessResponse($returnedData);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, $active){
        $validatedData = $request->validated();
        if(!$this->customerRepository->getCustomerByActive($active)){
            return $this->sentErrorResponse('Customer not found', 'error', 404);
        }
        return $this->sentSuccessResponse($this->customerRepository->updateCustomerByActive($active, $validatedData));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($active)
    {
        if(!$this->customerRepository->getCustomerByActive($active)){
            return $this->sentErrorResponse('Customer '.$active. ' is not found', 'error', 404);
        }
        return $this->sentSuccessResponse($this->customerRepository->deleteCustomerByActive($active), 'customer '.$active.' is deleted', 200);
    }
}
