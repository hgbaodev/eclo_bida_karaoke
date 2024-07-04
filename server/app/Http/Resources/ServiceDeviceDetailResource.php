<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;

class ServiceDeviceDetailResource extends JsonResource
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
            'service_name' => $this->service->name,
            'service_active' => $this->service->active,
            'device_name' => $this->device->name,
            'device_active' => $this->device->active,
            'device_image' => $this->device->image,
            'quantity' => $this->quantity,
            'device_value' => $this->device->value,
            'maintaining_quantity' => $this->maintaining_quantity,
        ];
    }
}
