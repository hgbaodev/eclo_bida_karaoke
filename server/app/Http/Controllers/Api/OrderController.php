<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interface\OrderRepositoryInterface;
use App\Models\Product;
use App\Notifications\OrderNotification;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\Notification;

class OrderController extends Controller
{
    protected $orderRepository;

    public function __construct(OrderRepositoryInterface $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }


    public function addProductsToOrder(Request $request, $active)
    {
        $this->orderRepository->addProductsToOrder($request, $active);
//        return $this->sentSuccessResponse($request->requestedProducts);
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
}
