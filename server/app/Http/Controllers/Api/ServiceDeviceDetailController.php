<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceDeviceDetail\StoreServiceDeviceDetailRequest;
use App\Http\Requests\ServiceDeviceDetail\UpdateServiceDeviceDetailRequest;
use App\Interface\DeviceRepositoryInterface;
use App\Interface\ServiceDeviceDetailRepositoryInterface;
use App\Interface\ServiceRepositoryInterface;
use Illuminate\Http\Request;

class ServiceDeviceDetailController extends Controller
{
    protected $serviceDeviceDetailRepository;
    protected $deviceRepository;
    protected $serviceRepository;

    public function __construct(ServiceRepositoryInterface $serviceRepository, ServiceDeviceDetailRepositoryInterface $serviceDeviceDetailRepository,DeviceRepositoryInterface $deviceRepository)
    {
        $this->serviceDeviceDetailRepository = $serviceDeviceDetailRepository;
        $this->deviceRepository = $deviceRepository;
        $this->serviceRepository = $serviceRepository;
    }

    public function index(Request $request){
        try {
            $returnedData = $this->serviceDeviceDetailRepository->getServiceDeviceDetail($request);
            return $this->sentSuccessResponse($returnedData);
        } catch (\Exception $e) {
            return $this->sentErrorResponse($e->getMessage());
        }
    }

    public function show()
    {

    }

    public function update(UpdateServiceDeviceDetailRequest $request, string $active)
    {
        try {
            $validated_data = $request->validated();

            $detailRepo = $this->serviceDeviceDetailRepository;
            $deviceRepo = $this->deviceRepository;
            // Convert device field to device_id
            $device = $deviceRepo->getDeviceByActive($validated_data['device']);
            $validated_data['device_id'] = $device->id;
            unset($validated_data['device']); // Remove the original device field

            $returnedData = $detailRepo->updateServiceDeviceDetailByActive($active, $validated_data);
            return $this->sentSuccessResponse($returnedData);
        } catch (\Exception $e) {
            return $this->sentErrorResponse($e->getMessage());
        }
    }

    public function store(StoreServiceDeviceDetailRequest $request){
        try {
            $validated_data = $request->validated();

            $detailRepo = $this->serviceDeviceDetailRepository;
            $deviceRepo = $this->deviceRepository;
            $serviceRepo = $this->serviceRepository;

            // Convert device field to device_id
            $device = $deviceRepo->getDeviceByActive($validated_data['device']);
            $service = $serviceRepo->getServiceByActive($validated_data['service']);

            $validated_data['device_id'] = $device->id;
            $validated_data['service_id'] = $service->id;

            unset($validated_data['device']); // Remove the original device field
            unset($validated_data['service']); // Remove the original device field

            $returnedData = $detailRepo->createServiceDeviceDetail( $validated_data);
            return $this->sentSuccessResponse($returnedData);
        } catch (\Exception $e) {
            return $this->sentErrorResponse($e->getMessage());
        }
    }

    public function destroy(){

    }
}
