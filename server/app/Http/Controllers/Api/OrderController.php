<?php

namespace App\Http\Controllers\Api;

use App\Enums\KitchenOrderEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\PayOrderRequest;
use App\Interface\KitchenOrderRepositoryInterface;
use App\Interface\NotificationRepositoryInterface;
use App\Interface\OrderRepositoryInterface;
use App\Interface\ProductRepositoryInterface;
use App\Notifications\OrderNotification;
use Illuminate\Http\Request;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Http\Requests\Order\UpdateOrderRequest;
use App\Interface\CustomerRepositoryInterface;
use App\Interface\OrderDetailRepositoryInterface;
use App\Interface\ServiceRepositoryInterface;
use App\Http\Controllers\Event\SendEvent;

class OrderController extends Controller
{
    protected $orderRepository;
    protected $serviceRepository;
    protected $kitchenOrderRepository;
    protected $productRepository;
    protected $customerRepository;
    protected $orderDetailRepository;

    public function __construct(
        OrderRepositoryInterface $orderRepository,
        ServiceRepositoryInterface $serviceRepositoryInterface,
        KitchenOrderRepositoryInterface $kitchenOrderRepository,
        ProductRepositoryInterface $productRepository,
        CustomerRepositoryInterface $customerRepository,
        OrderDetailRepositoryInterface $orderDetailRepository
    ) {
        $this->orderRepository = $orderRepository;
        $this->serviceRepository =  $serviceRepositoryInterface;
        $this->kitchenOrderRepository = $kitchenOrderRepository;
        $this->productRepository = $productRepository;
        $this->customerRepository = $customerRepository;
        $this->orderDetailRepository = $orderDetailRepository;
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
            'active' => $active,
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


            $eventData = [
                'active' => $active,
                'product_name' => $kitchenOrder->product->name,
                'product_active' => $kitchenOrder->product->active,
                'product_quantity' => $kitchenOrder->quantity,
                'service_name' => $kitchenOrder->order->service->name,
                'service_active' => $kitchenOrder->order->service->active,
            ];

            // Convert the kitchen order to an array and set the status to processing
            $kitchenOrderData = $kitchenOrder->toArray();
            $kitchenOrderData['status'] = KitchenOrderEnum::WAITING;

            // Update the kitchen order and return the updated order with a success response
            $updatedKitchenOrder = $repo->updateKitchenOrderByActive($active, $kitchenOrderData);

            $serviceName = $kitchenOrder->order->service->name;
            $productName = $kitchenOrder->product->name;

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

            $eventData = [
                'active' => $active,
                'product_name' => $kitchenOrder->product->name,
                'product_active' => $kitchenOrder->product->active,
                'product_quantity' => $kitchenOrder->quantity,
                'service_name' => $kitchenOrder->order->service->name,
                'service_active' => $kitchenOrder->order->service->active,
            ];

            // Convert the kitchen order to an array and set the status to processing
            $kitchenOrderData = $kitchenOrder->toArray();
            $kitchenOrderData['status'] = KitchenOrderEnum::DONE;

            // Update the kitchen order and return the updated order with a success response
            $updatedKitchenOrder = $repo->deleteKitchenOrderByActive($active);
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

    public function payOrder(PayOrderRequest $request, $active)
    {
        $validated_data = $request->validated();
        $order = $this->orderRepository->findOrderByActive($active);
        if (!$order) {
            return $this->sentErrorResponse('Order not found', 'errors', 404);
        }
        if (isset($validated_data['products'])) {
            $check = $this->orderDetailRepository->addProductsOrder($validated_data['products'], $order->id);
            if (!$check) return $this->sentErrorResponse('No update products detail');
        }
        if (isset($validated_data['devices'])) {
            $check = $this->orderDetailRepository->addDevicesOrder($validated_data['devices'], $order->id);
            if (!$check) return $this->sentErrorResponse('No update devices detail');
        }
        $order->checkout_time = $validated_data['checkout_time'];
        $order->total_price = $validated_data['total_price'];
        if (isset($validated_data['customer_active'])) {
            $customer = $this->customerRepository->getCustomerByActive($validated_data['customer_active']);
            $order->customer_id = $customer->id;
        }
        $order->save();
        return $this->sentSuccessResponse($order, 'Order has been paid successfully', 200);
    }
    public function addProductsToKitchenOrder(array $products, string $active)
    {
        try {
            $order = $this->orderRepository->findOrderByActive($active);
            $data = [];

            // add products to database one by one
            foreach ($products as $product) {

                // Handle table storing
                $product = $this->productRepository->getProductByActive($product['active']);

                $newKitchenOrder = [
                    'order_id' => $order->id,
                    'quantity' => $product['quantity'],
                ];
                $newKitchenOrder['product_id'] = $product->id;

                $newOrder = $this->kitchenOrderRepository->createKitchenOrder($newKitchenOrder);

                // Handle evt data adding in order to send evt
                $eventData['status'] = KitchenOrderEnum::RECEIVED;
                $eventData['active'] = $newOrder['active'];
                $eventData['order_active'] = $active;
                $eventData['quantity'] = $newOrder['quantity'];
                $eventData['product_name'] = $product->name;

                $data[] = $eventData;
            }
            SendEvent::send('kitchenOrderEvent', $data);
        } catch (\Exception $e) {
        }
    }

    public function updateOrder(UpdateOrderRequest $request, $active)
    {
        $validated_data = $request->validated();
        $order = $this->orderRepository->findOrderByActive($active);
        if (!$order) {
            return $this->sentErrorResponse('Order not found', 'errors', 404);
        }

        if (isset($validated_data['products'])) {
            $products = $validated_data['products'];
            $data = [];
            foreach ($products as $productData) {
                $productActive = $productData['active'];
                $newQuantity = $productData['quantity'];

                // Lấy tổng số lượng hiện có từ kitchen_order
                $totalQuantity = $this->kitchenOrderRepository->getTotalQuantityByProductAndOrderActive($productActive, $active);

                if ($totalQuantity < $newQuantity) {
                    // Nếu tổng số lượng nhỏ hơn số lượng mới, tạo kitchen_order mới với số dư ra
                    $remainingQuantity = $newQuantity - $totalQuantity;

                    // Tạo kitchen_order mới với số dư ra
                    $product = $this->productRepository->getProductByActive($productActive);
                    $newKitchenOrder = [
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $remainingQuantity,
                    ];

                    $newOrder = $this->kitchenOrderRepository->createKitchenOrder($newKitchenOrder);

                    $eventData['status'] = KitchenOrderEnum::RECEIVED;
                    $eventData['active'] = $newOrder['active'];
                    $eventData['order_active'] = $active;
                    $eventData['quantity'] = $newOrder['quantity'];
                    $eventData['product_name'] = $product->name;

                    $data[] = $eventData;
                } else {
                    // Nếu tổng số lượng lớn hơn hoặc bằng số lượng mới, trừ bớt trong kitchen_order từ bản ghi cũ nhất tới mới nhất
                    $this->kitchenOrderRepository->deductQuantityFromOldestOrders($productActive, $active, $totalQuantity - $newQuantity);
                }
            }
            SendEvent::send('kitchenOrderEvent', $data);
        }

        if (isset($validated_data['devices'])) {
            $check = $this->orderDetailRepository->addDevicesOrder($validated_data['devices'], $order->id);
            if (!$check) return $this->sentErrorResponse('No update devices detail');
        }

        if (isset($validated_data['customer_active'])) {
            $customer = $this->customerRepository->getCustomerByActive($validated_data['customer_active']);
            $order->customer_id = $customer->id;
        } else {
            $order->customer_id = null;
        }

        $order->save();
        return $this->sentSuccessResponse($order, 'Order has been updated successfully', 200);
    }

    public function getInvoices(Request $request)
    {
        return $this->sentSuccessResponse($this->orderRepository->getInvoices($request));
    }
}
