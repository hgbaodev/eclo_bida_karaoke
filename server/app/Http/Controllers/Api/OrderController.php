<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interface\NotificationRepositoryInterface;
use App\Interface\OrderRepositoryInterface;
use App\Notifications\OrderNotification;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\Notification;
use App\Events\OrderProductRequestEvent;

class OrderController extends Controller
{
    protected $orderRepository;

    public function __construct(OrderRepositoryInterface $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function addProductsToOrder(Request $request, string $active)
    {
        $order = $this->orderRepository->getOrderByActive($active);
        $request->merge(['order' => $order]);
        return $this->sentSuccessResponse();
    }

    public function requestedProducts()

    {
        return $this->sentSuccessResponse($this->notifcationRepository->getUnreadNotifications());
    }

    public function markOrderRequestAsProccessing(Request $request)
    {
       // TODO: danh dau la dang che bien
    }

    public function markOrderRequestAsDone(Request $request)
    {
        // TODO: danh dau la dang che bien
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
