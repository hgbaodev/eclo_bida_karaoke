<?php

namespace App\Http\Requests\Customer;

use App\Http\Helpers\HelperRequest;

class UpdateCustomerRequest extends HelperRequest

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
            'name' => 'required',
            'phone' => 'required|unique:customers|regex:/^[0-9]{10,}$/',
            'email' => 'required|email|unique:customers',
        ];
    }
}
