<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Service\ChangeStatusServiceRequest;
use App\Http\Requests\Service\StoreServiceRequest;
use App\Http\Requests\Service\UpdateServiceRequest;
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

    public function show(string $active) {
        $data = $this->serviceRepository->getServiceByActive($active);
        return $this->sentSuccessResponse($data);
    }

    public function changeStatus(ChangeStatusServiceRequest $request, $actvies)
    {
        $service = $this->serviceRepository->getServiceByActive($actvies);
        if (!$service) {
            return $this->sentErrorResponse('Service not found', 'erros', 404);
        }
        $validatedData = $request->validated();
        return $this->sentSuccessResponse($this->serviceRepository->changeStatus($validatedData, $service->id));
    }

    public function update(UpdateServiceRequest $request, $active)
    {
        $validatedData = $request->validated();
        $service = $this->serviceRepository->getServiceByActive($active);
        if (!$service) {
            return $this->sentErrorResponse('Service not found', 'erros', 404);
        }
        $validatedData['area_id'] = $this->areaRepository->getAreaByActive($validatedData['area_active'])->id;
        $validatedData['price_id'] = $this->priceRepository->getPriceByActive($validatedData['price_active'])->id;
        $validatedData['service_type_id'] = $this->serviceTypeRepository->getServiceTypeByActive($validatedData['service_type_active'])->id;
        return $this->sentSuccessResponse($this->serviceRepository->updateServiceById($validatedData, $service->id));
    }

    public function destroy($active)
    {
        $service = $this->serviceRepository->getServiceByActive($active);
        if (!$service) {
            return $this->sentErrorResponse('Service not found', 'erros', 404);
        }
        $deleteService = $this->serviceRepository->deleteServiceById($service->id);
        return $this->sentSuccessResponse($deleteService, 'Service deleted successfully', 201);
    }
}
