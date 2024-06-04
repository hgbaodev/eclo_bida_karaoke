<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceType\StoreServiceTypeRequest;
use App\Http\Requests\ServiceType\UpdateServiceTypeRequest;
use App\Interface\ServiceTypeRepositoryInterface;
use Illuminate\Http\Request;

class ServiceTypeController extends Controller
{

    protected $serviceTypeRepository;
    public function __construct(ServiceTypeRepositoryInterface $serviceTypeRepository)
    {
        $this->serviceTypeRepository = $serviceTypeRepository;
    }

    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->serviceTypeRepository->getServiceTypes($request));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceTypeRequest $request)
    {
        $validated_data = $request->validated();
        return $this->sentSuccessResponse($this->serviceTypeRepository->createServiceType($validated_data), 'Service type has been created successfully', 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $active)
    {
        return $this->sentSuccessResponse($this->serviceTypeRepository->getServiceTypeByActive($active));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceTypeRequest $request, string $active)
    {
        $validated_data = $request->validated();
        if(!$this->serviceTypeRepository->getServiceTypeByActive($active)){
            return $this->sentErrorResponse('The service type is not found');
        }
        return $this->sentSuccessResponse($this->serviceTypeRepository->updateServiceTypeByActive($active, $validated_data), 'Service type '.$active.' updated', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $active)
    {
        if(!$this->serviceTypeRepository->getServiceTypeByActive($active)){
            return $this->sentErrorResponse('The service type is not found');
        }
        return $this->sentSuccessResponse($this->serviceTypeRepository->deleteServiceTypeByActive($active), 'Service type '.$active.' deleted', 200);
    }
}
