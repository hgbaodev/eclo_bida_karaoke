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

    public function index()
    {
        return $this->sentSuccessResponse($this->serviceTypeRepository->getAllServiceTypes());
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
    public function show(string $id)
    {
        return $this->sentSuccessResponse($this->serviceTypeRepository->getServiceTypeById($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceTypeRequest $request, string $id)
    {
        $validated_data = $request->validated();
        if(!$this->serviceTypeRepository->getServiceTypeById($id)){
            return $this->sentErrorResponse('The service type is not found');
        }
        return $this->sentSuccessResponse($this->serviceTypeRepository->updateServiceTypeById($id, $validated_data), 'Service type '.$id.' updated', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(!$this->serviceTypeRepository->getServiceTypeById($id)){
            return $this->sentErrorResponse('The service type is not found');
        }
        return $this->sentSuccessResponse($this->serviceTypeRepository->deleteServiceTypeById($id), 'Service type '.$id.' deleted', 200);
    }
}
