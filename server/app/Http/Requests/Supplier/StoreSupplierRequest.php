<?php

namespace App\Http\Requests\Supplier;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Helpers\HelperRequest;
use Illuminate\Validation\Rule;

class StoreSupplierRequest extends HelperRequest
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
        return  [
            'name' => 'required',
            'phone' => ['required', 'regex:/^[0-9]{10,}$/'],
            'address' => ['required'],
            'status' => 'required|in:A,D',
        ];
    }
}
