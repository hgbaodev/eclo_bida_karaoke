<?php

namespace App\Http\Requests\Supplier;

use App\Http\Helpers\HelperRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSupplierRequest extends HelperRequest
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
        $active = $this->route('active');
        return  [
            'name' => 'required',
            'phone' => ['required', 'regex:/^[0-9]{10,}$/', Rule::unique('suppliers')->ignore($active, 'active')],
            'address' => ['required'],
            'status' => 'required|in:A,D',
        ];
    }
}
