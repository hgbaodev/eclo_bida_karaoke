<?php

namespace App\Http\Controllers\Api;

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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->sentSuccessResponse($this->deviceRepository->getAllDevices());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDeviceRequest $request)
    {
        $validated_data = $request->validated();
        return $this->sentSuccessResponse($this->deviceRepository->createDevice($validated_data), 'The device has been created!!!', 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->sentSuccessResponse($this->deviceRepository->getDeviceById($id));
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
    public function update(UpdateDeviceRequest $request,$id)
    {
        $validated_data = $request->validated();
        if (!$this->deviceRepository->getDeviceById($id)){
            return $this->sentErrorResponse('Device '. $id. ' is not found');
        }
        return $this->sentSuccessResponse($this->deviceRepository->updateDeviceById($id, $validated_data), 'The device '.$id.' has been updated!!!', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (!$this->deviceRepository->getDeviceById($id)){
            return $this->sentErrorResponse('Device '. $id. ' is not found');
        }
        return $this->sentSuccessResponse($this->deviceRepository->deleteDeviceById($id), 'The device '.$id.' has been deleted!!!', 200);
    }
}
