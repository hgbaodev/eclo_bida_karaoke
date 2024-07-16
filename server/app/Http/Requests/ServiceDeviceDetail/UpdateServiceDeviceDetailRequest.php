<?php

namespace App\Http\Requests\ServiceDeviceDetail;

use App\Http\Helpers\HelperRequest;

class UpdateServiceDeviceDetailRequest extends HelperRequest
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
            'quantity' => ['required', 'integer', 'max:1000'],
            'status' => ['required', 'string', 'in:in_use,available,maintenance'],
            'device' => 'required|exists:devices,active',
            'maintenance_quantity' => ['required', 'integer', 'lte:quantity'],
        ];
    }
}
