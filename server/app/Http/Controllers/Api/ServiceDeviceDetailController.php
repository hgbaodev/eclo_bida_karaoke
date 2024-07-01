<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Interface\ServiceDeviceDetailRepositoryInterface;
use Illuminate\Http\Request;

class ServiceDeviceDetailController extends Controller
{
    protected $serviceDeviceDetailRepository;
    public function __construct(ServiceDeviceDetailRepositoryInterface $serviceDeviceDetailRepository)
    {
        $this->serviceDeviceDetailRepository = $serviceDeviceDetailRepository;
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

    public function update(){

    }

    public function store(){

    }

    public function destroy(){

    }
}
