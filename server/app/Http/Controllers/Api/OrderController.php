<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interface\OrderRepositoryInterface;
use App\Notifications\OrderNotification;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\Notification;
use App\Events\OrderProductRequestEvent;

class OrderController extends Controller
{
    protected $orderRepository;
    protected $orderProductRequestEvent;

    public function __construct(OrderRepositoryInterface $orderRepository)
    {
        $this->orderRepository = $orderRepository;
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
}
