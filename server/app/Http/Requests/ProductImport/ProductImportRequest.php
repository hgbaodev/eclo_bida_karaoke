<?php

namespace App\Http\Requests\ProductImport;

use App\Http\Helpers\HelperRequest;

class ProductImportRequest extends HelperRequest
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
            'user_import' => 'nullable',
            'total_cost' => 'nullable',
            'import_day' => 'required',

            'products' => 'required|array',
            'products.*.cost_price' => 'required|numeric|min:0',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.product' => 'required|string',
            'products.*.supplier' => 'nullable|string'
        ];
    }
}
