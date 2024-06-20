<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Notifications\Notification;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class MarkOrderRequestAsReadEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $orderNotification;

    /**
     * Create a new event instance.
     */
    public function __construct($orderNotification)
    {
        $this->orderNotification = $orderNotification;
    }

    public function broadcastOn()
    {
        Log::info('MarkOrderRequestAsRead broadcast on', ['channel' => 'eclo-channel']);
        return ['eclo-channel']; // Tên của channel mà đầu bếp sẽ nghe
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        $data = [
            'orderNotification' => $this->orderNotification,
        ];

        Log::info('MarkOrderRequestAsReadEvent broadcast with', $data);
        return $data;
    }

    public function broadcastAs(): string
    {
        return 'productOrder.read';
    }
}
