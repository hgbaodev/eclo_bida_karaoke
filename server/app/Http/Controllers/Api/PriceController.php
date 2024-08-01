<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Price\StorePriceRequest;
use App\Http\Requests\Price\UpdatePriceRequest;
use App\Interface\PriceRepositoryInterface;
use App\Interface\ServiceTypeRepositoryInterface;
use Illuminate\Http\Request;
use Mockery\Exception;

class PriceController extends Controller
{
    protected $priceRepository;
    protected $serviceTypeRepository;

    public function __construct(PriceRepositoryInterface $priceRepository, ServiceTypeRepositoryInterface $serviceTypeRepository)
    {
        $this->priceRepository = $priceRepository;
        $this->serviceTypeRepository = $serviceTypeRepository;
    }

    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->priceRepository->getPrices($request));
    }

    public function show(string $active)
    {
        $returnedData = $this->priceRepository->getPriceByActive($active);
        if ($returnedData == null) {
            return $this->sentErrorResponse("Price not found");
        }
        return $this->sentSuccessResponse($returnedData);
    }

    public function store(StorePriceRequest $request)
    {
        try {
            $validated_data = $request->validated();
            $serviceType = $this->serviceTypeRepository->getServiceTypeByActive($validated_data['service_type']);
            $validated_data['service_type_id'] = $serviceType->id;
            unset($validated_data['service_type']);
            $this->priceRepository->createPrice($validated_data);
            return $this->sentSuccessResponse($validated_data);
        } catch (Exception) {
            return $this->sentErrorResponse("Failed");
        }
    }

    public function update(UpdatePriceRequest $request, string $active)
    {
        if (!$this->priceRepository->getPriceByActive($active)) {
            return $this->sentErrorResponse('The price was not found');
        }

        try {
            $validated_data = $request->validated();
            $this->priceRepository->updatePriceByActive($active, $validated_data);
            return $this->sentSuccessResponse($validated_data);
        } catch (Exception $e) {
            return $this->sentErrorResponse("Failed: " . $e);
        }
    }

    public function destroy(string $active)
    {
        if (!$this->priceRepository->getPriceByActive($active)) {
            return $this->sentErrorResponse('The price was not found');
        }

        try {
            $returned_data = $this->priceRepository->deletePriceByActive($active);
            return $this->sentSuccessResponse($returned_data);
        } catch (Exception $e) {
            return $this->sentErrorResponse("Failed: " . $e);
        }
    }
}
