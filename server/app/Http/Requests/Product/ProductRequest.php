<?php

namespace App\Http\Requests\Product;

use App\Http\Helpers\HelperRequest;
use Symfony\Component\Console\Helper\Helper;

class ProductRequest extends HelperRequest
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
            'product_type' => 'required',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'quantity' => 'nullable',
        ];
    }
}
