<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Service\ChangeStatusServiceRequest;
use App\Http\Requests\Service\StoreServiceRequest;
use App\Interface\AreaRepositoryInterface;
use App\Interface\PriceRepositoryInterface;
use App\Interface\ServiceRepositoryInterface;
use App\Interface\ServiceTypeRepositoryInterface;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    protected $serviceRepository;
    protected $areaRepository;
    protected $priceRepository;
    protected $serviceTypeRepository;


    public function __construct(ServiceRepositoryInterface $serviceRepositoryInterface, AreaRepositoryInterface $areaRepositoryInterface, PriceRepositoryInterface $priceRepositoryInterface, ServiceTypeRepositoryInterface $serviceTypeRepositoryInterface)
    {
        $this->serviceRepository = $serviceRepositoryInterface;
        $this->areaRepository = $areaRepositoryInterface;
        $this->priceRepository = $priceRepositoryInterface;
        $this->serviceTypeRepository = $serviceTypeRepositoryInterface;
    }

    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->serviceRepository->getServices($request));
    }

    public function store(StoreServiceRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['area_id'] = $this->areaRepository->getAreaByActive($validatedData['area_active'])->id;
        $validatedData['price_id'] = $this->priceRepository->getPriceByActive($validatedData['price_active'])->id;
        $validatedData['service_type_id'] = $this->serviceTypeRepository->getServiceTypeByActive($validatedData['service_type_active'])->id;
        return $this->sentSuccessResponse($this->serviceRepository->createService($validatedData));
    }

    public function changeStatus(ChangeStatusServiceRequest $request, $actvies)
    {
        $service = $this->serviceRepository->getServiceByActive($actvies);
        if (!$service) {
            return $this->sentFailedResponse('Service not found', 404);
        }
        $validatedData = $request->validated();
        return $this->sentSuccessResponse($this->serviceRepository->changeStatus($validatedData, $service->id));
    }
}
