<?php

namespace App\Http\Requests\Order;

use App\Http\Helpers\HelperRequest;

class PayOrderRequest extends HelperRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'checkout_time' => 'required', // Changed from 'datetime' to 'date'
            'total_price' => 'required|numeric',
            'products' => 'nullable|array', // Changed from 'empty|array' to 'required|array'
            'customer_active' => 'nullable|string|exists:customers,active', // Changed from 'customer_active' to 'customer_id' and 'customers,active' to 'customers,id'
        ];
    }
}
