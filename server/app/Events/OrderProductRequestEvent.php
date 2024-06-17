<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class OrderProductRequestEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $order;
    public $products;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Order $order, array $products)
    {
        $this->order = $order;
        $this->products = $products;
        Log::info('OrderProductRequestEvent constructed', [
            'order_id' => $this->order->id,
            'products' => $this->products
        ]);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        Log::info('OrderProductRequestEvent broadcast on', ['channel' => 'eclo']);
        return ['eclo']; // Tên của channel mà đầu bếp sẽ nghe
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        $data = [
            'order_active' => $this->order->active,
            'products' => $this->products,
        ];

        Log::info('OrderProductRequestEvent broadcast with', $data);
        return $data;
    }

    public function broadcastAs(): string
    {
        return 'productOrder.requested';
    }
}
