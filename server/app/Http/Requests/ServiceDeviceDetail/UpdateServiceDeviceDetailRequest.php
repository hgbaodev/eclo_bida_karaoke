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
            'device' => [
                'required',
                'string',
                'regex:/^[a-zA-Z0-9_-]{43}$/' // Chỉ cho phép các ký tự chữ cái, số, gạch ngang và gạch dưới, với độ dài cố định là 43
            ],
            'maintenance_quantity' => ['required', 'integer', 'lte:quantity'],
        ];
    }
}
