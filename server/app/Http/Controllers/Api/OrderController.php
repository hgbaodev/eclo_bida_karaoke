<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interface\KitchenOrderRepositoryInterface;
use App\Interface\NotificationRepositoryInterface;
use App\Interface\OrderRepositoryInterface;
use App\Interface\ProductRepositoryInterface;
use App\Notifications\OrderNotification;
use Illuminate\Http\Request;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Interface\ServiceRepositoryInterface;

class OrderController extends Controller
{
    protected $orderRepository;
    protected $serviceRepository;
    protected $kitchenOrderRepository;
    protected $productRepository;

    public function __construct(
        OrderRepositoryInterface $orderRepository,
        ServiceRepositoryInterface $serviceRepositoryInterface,
        KitchenOrderRepositoryInterface $kitchenOrderRepository,
        ProductRepositoryInterface $productRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->serviceRepository =  $serviceRepositoryInterface;
        $this->kitchenOrderRepository = $kitchenOrderRepository;
        $this->productRepository = $productRepository;
    }

    public function addProductsToOrder(Request $request, string $active)
    {
        try {
            $order = $this->orderRepository->getOrderByActive($active);
            $orderId = $order->id;
            $requestedProducts = $request->requestedProducts;
            $kitchenOrders = [];

            foreach ($requestedProducts as $requestedProduct) {
                $product = $this->productRepository->getProductByActive($requestedProduct['active']);
                $data = [
                    'order_id' => $orderId,
                    'quantity' => $requestedProduct['quantity'],
                ];
                $kitchenOrders[] = $data;
                $data['product_id'] = $product->id;
                $this->kitchenOrderRepository->createKitchenOrder($data);
            }

            $request->merge(['data'=>$kitchenOrders]);
            return $this->sentSuccessResponse($order, 'This order has been requested successfully');
        } catch (\Exception $e){
            return $this->sentErrorResponse($e->getMessage());
        }
    }

    public function getKitchenOrders(Request $request)
    {
        return $this->sentSuccessResponse($this->kitchenOrderRepository->getKitchenOrders($request));
    }

    public function markOrderRequestAsProcessing(Request $request)
    {
        // TODO: danh dau la dang xu ly
    }

    public function markOrderRequestAsWaiting(Request $request)
    {
        // TODO: danh dau la dang cho giao
    }

    public function markOrderRequestAsDone(Request $request)
    {
        // TODO: danh dau la da xong
    }

    public function index(Request $request)
    {
        $data = $this->orderRepository->getOders($request);
        return $this->sentSuccessResponse($data);
    }

    public function show($active)
    {
        $returnedData = $this->orderRepository->getOrderByActive($active);
        return $this->sentSuccessResponse($returnedData);
    }

    public function store(StoreOrderRequest $request)
    {
        $validated_data = $request->validated();
        $service = $this->serviceRepository->getServiceByActive($validated_data['service_active']);
        if (!$service) {
            return $this->sentErrorResponse('Service not found', 'errors', 404);
        }
        $service_id = $service->id;
        $checkOrder = $this->orderRepository->checkOrderServiceById($service_id);
        if ($checkOrder) {
            return $this->sentErrorResponse('You have an order that is not completed yet');
        }
        $user_id = auth()->user()->id;
        $validated_data['user_id'] = $user_id;
        $validated_data['service_id'] = $service_id;
        $order = $this->orderRepository->createOrder($validated_data);
        return $this->sentSuccessResponse($order);
    }
}
