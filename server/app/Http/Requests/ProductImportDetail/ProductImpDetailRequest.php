<?php

namespace App\Http\Requests\ProductImportDetail;

use App\Http\Helpers\HelperRequest;
use Illuminate\Foundation\Http\FormRequest;

class ProductImpDetailRequest extends HelperRequest
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
            'quantity' => 'required',
            'cost_price' => 'required',
            'selling_price' => 'required',
            'product' => 'required',
            'supplier' => 'required',
            'import' => 'required',
        ];
    }
}
