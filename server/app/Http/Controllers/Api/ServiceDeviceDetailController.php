<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceDeviceDetail\UpdateServiceDeviceDetailRequest;
use App\Interface\DeviceRepositoryInterface;
use App\Interface\ServiceDeviceDetailRepositoryInterface;
use Illuminate\Http\Request;

class ServiceDeviceDetailController extends Controller
{
    protected $serviceDeviceDetailRepository;
    protected $deviceRepository;
    public function __construct(ServiceDeviceDetailRepositoryInterface $serviceDeviceDetailRepository,DeviceRepositoryInterface $deviceRepository)
    {
        $this->serviceDeviceDetailRepository = $serviceDeviceDetailRepository;
        $this->deviceRepository=$deviceRepository;
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


    public function store(){

    }

    public function destroy(){

    }
}
