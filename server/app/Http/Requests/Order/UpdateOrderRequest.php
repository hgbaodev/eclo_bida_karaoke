<?php

namespace App\Http\Requests\Order;

use App\Http\Helpers\HelperRequest;

class UpdateOrderRequest extends HelperRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'devices'  => 'nullable|array',
            'products' => 'nullable|array',
            'customer_active' => 'nullable|string|exists:customers,active',
        ];
    }
}