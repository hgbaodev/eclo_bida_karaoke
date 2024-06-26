<?php

namespace App\Http\Controllers\Api;

use App\Enums\KitchenOrderEnum;
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
        ProductRepositoryInterface $productRepository
    ) {
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

            // add products to database one by one
            foreach ($requestedProducts as $requestedProduct) {
                $product = $this->productRepository->getProductByActive($requestedProduct['active']);
                $data = [
                    'order_id' => $orderId,
                    'quantity' => $requestedProduct['quantity'],
                ];
                $data['product_id'] = $product->id;
                $newOrder = $this->kitchenOrderRepository->createKitchenOrder($data);

                //Returned data
                $eventData['status'] = 'R';
                $eventData['active'] = $newOrder['active'];
                $eventData['order_active'] = $active;
                $eventData['quantity'] = $data['quantity'];
                $eventData['product_name'] = $product->name;

                $kitchenOrders[] = $eventData;
            }

            $request->merge(['data' => $kitchenOrders]);
            return $this->sentSuccessResponse($kitchenOrders, 'This order has been requested successfully');
        } catch (\Exception $e) {
            return $this->sentErrorResponse($e->getMessage());
        }
    }

    public function getKitchenOrders(Request $request)
    {
        return $this->sentSuccessResponse($this->kitchenOrderRepository->getKitchenOrders($request));
    }

    public function markKitchenOrderAsProcessing(Request $request, string $active)
    {
        $kitchenOrder = $this->kitchenOrderRepository->getKitchenOrderByActive($active);

        if (!$kitchenOrder) {
            return $this->sentErrorResponse('Order not found');
        }

        $kitchenOrderData = $kitchenOrder->toArray();
        $kitchenOrderData['status'] = KitchenOrderEnum::PROCESSING;

        $updatedKitchenOrder = $this->kitchenOrderRepository->updateKitchenOrderByActive($active, $kitchenOrderData);

        $eventData = [
            'active'=> $active,
        ];

        $request->merge(['data' => $eventData]);

        return $this->sentSuccessResponse($updatedKitchenOrder, 'Marked as processing');
    }

    public function markKitchenOrderAsWaiting(Request $request, string $active)
    {
        try {
            $repo = $this->kitchenOrderRepository;

            $kitchenOrder = $repo->getKitchenOrderByActive($active);

            // If no order is found, return an error response
            if (!$kitchenOrder) {
                return $this->sentErrorResponse('Order not found');
            }

            // Convert the kitchen order to an array and set the status to processing
            $kitchenOrderData = $kitchenOrder->toArray();
            $kitchenOrderData['status'] = KitchenOrderEnum::WAITING;

            // Update the kitchen order and return the updated order with a success response
            $updatedKitchenOrder = $repo->updateKitchenOrderByActive($active, $kitchenOrderData);

            $serviceName = $kitchenOrder->order->service->name;
            $productName = $kitchenOrder->product->name;

            $eventData = [
                'active'=> $active,
                'serviceName' => $serviceName,
                'productName' => $productName,
                'quantity' => $kitchenOrder->quantity,
            ];

            $request->merge(['data' => $eventData]);

            return $this->sentSuccessResponse($updatedKitchenOrder, 'Marked as waiting');
        } catch (\Exception $e) {
            return $this->sentErrorResponse($e->getMessage());
        }
    }

    public function markKitchenOrderAsDone(Request $request, string $active)
    {
        try {
            $repo = $this->kitchenOrderRepository;
            $kitchenOrder = $repo->getKitchenOrderByActive($active);

            // If no order is found, return an error response
            if (!$kitchenOrder) {
                return $this->sentErrorResponse('Order not found');
            }

            // Convert the kitchen order to an array and set the status to processing
            $kitchenOrderData = $kitchenOrder->toArray();
            $kitchenOrderData['status'] = KitchenOrderEnum::DONE;

            // Update the kitchen order and return the updated order with a success response
            $updatedKitchenOrder = $repo->deleteKitchenOrderByActive($active);
            $eventData = [
                'active'=> $active,
            ];

            $request->merge(['data' => $eventData]);
            return $this->sentSuccessResponse($updatedKitchenOrder, 'Marked as done');
        } catch (\Exception $e) {
            return $this->sentErrorResponse($e->getMessage());
        }
    }

    public function index(Request $request)
    {
        $data = $this->orderRepository->getOders($request);
        return $this->sentSuccessResponse($data);
    }

    public function show($active)
    {
        $returnedData = $this->orderRepository->getOrderByActive($active);
        if (!$returnedData) {
            return $this->sentErrorResponse('Order not found', 'errors', 404);
        }

        unset($returnedData['orderdetails']);
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
