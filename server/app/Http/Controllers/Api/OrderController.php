<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interface\OrderRepositoryInterface;
use App\Notifications\OrderNotification;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Interface\ServiceRepositoryInterface;

class OrderController extends Controller
{
    protected $orderRepository;
    protected $serviceRepository;
    protected $orderProductRequestEvent;

    public function __construct(OrderRepositoryInterface $orderRepository, ServiceRepositoryInterface $serviceRepositoryInterface)
    {
        $this->orderRepository = $orderRepository;
        $this->serviceRepository =  $serviceRepositoryInterface;
    }

    public function addProductsToOrder(Request $request, string $active)
    {
        $order = $this->orderRepository->getOrderByActive($active);
        // Thêm order vào request để middleware có thể truy cập
        $request->merge(['order' => $order]);
        // Thông báo cho order
        $order->notify(new OrderNotification($request->requestedProducts, $active));
        return $this->sentSuccessResponse();
    }

    public function fiveLatestUnreadRequests()
    {
        $unreadNotifications = DatabaseNotification::whereNull('read_at')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->toArray();
        return response()->json($unreadNotifications);
    }

    public function markOrderRequestAsRead(Request $request)
    {
        if ($request->has('id')) {
            $notification = DatabaseNotification::find($request->id);

            if ($notification) {
                $notification->markAsRead();
                return response()->json(['message' => 'Notification marked as read.'], 200);
            }

            return response()->json(['message' => 'Notification not found.'], 404);
        }

        return response()->json(['message' => 'Notification ID is required.'], 400);
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
        $service_id = $this->serviceRepository->getServiceByActive($validated_data['service_active'])->id;
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
