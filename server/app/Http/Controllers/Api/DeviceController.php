<?php

namespace App\Http\Controllers\Api;

use App\Helpers\FileHandler;
use App\Http\Controllers\Controller;
use App\Http\Requests\Device\StoreDeviceRequest;
use App\Http\Requests\Device\UpdateDeviceRequest;
use App\Interface\DeviceRepositoryInterface;
use App\Repositories\DeviceRepository;
use Illuminate\Http\Request;

class DeviceController extends Controller
{
    protected $deviceRepository;
    public function __construct(DeviceRepositoryInterface $deviceRepository)
    {
        $this->deviceRepository = $deviceRepository;
    }

    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->deviceRepository->getDevices($request));
    }

    public function store(StoreDeviceRequest $request)
    {
        $validated_data = $request->validated();
        if ($request->hasFile('image')) {
            $validated_data['image'] = FileHandler::storeFile($request->file('image'));
        }
        $device = $this->deviceRepository->createDevice($validated_data);
        return $this->sentSuccessResponse($device, 'The device has been created!!!', 200);
    }

    public function show($id)
    {
        return $this->sentSuccessResponse($this->deviceRepository->getDeviceById($id));
    }

    public function update(UpdateDeviceRequest $request, string $active)
    {
        $validated_data = $request->validated();
        if (!$this->deviceRepository->getDeviceByActive($active)) {
            return $this->sentErrorResponse('Device ' . $active . ' is not found');
        }
        return $this->sentSuccessResponse($this->deviceRepository->updateDeviceByActive($active, $validated_data), 'The device ' . $active . ' has been updated!!!', 200);
    }

    public function destroy(string $active)
    {
        if (!$this->deviceRepository->getDeviceByActive($active)) {
            return $this->sentErrorResponse('Device ' . $active . ' is not found');
        }
        return $this->sentSuccessResponse($this->deviceRepository->deleteDeviceByActive($active), 'The device ' . $active . ' has been deleted!!!', 200);
    }
}
