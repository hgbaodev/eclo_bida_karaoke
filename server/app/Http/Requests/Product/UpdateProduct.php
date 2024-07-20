<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProduct extends FormRequest
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
            'name' => 'nullable',
            'product_type' => 'nullable',
            'selling_price' => 'nullable',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'quantity' => 'nullable',
        ];
    }
}
