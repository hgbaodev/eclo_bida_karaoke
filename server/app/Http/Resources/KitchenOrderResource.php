<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KitchenOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'active' => $this->active,
            'status' => $this->status,
            'order_active' => $this->order->active,
            'quantity' => $this->quantity,
            'product_name' => $this->product->name,
        ];
    }
}
