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
            'phone' => ['required', 'regex:/^(0[3|5|7|8|9])+([0-9]{8})\b$/', Rule::unique('suppliers')->ignore($active, 'active')],
            'address' => ['required'],
            'status' => 'required|in:A,D',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'phone.regex' => 'Invalid phone number. Phone number must start with "0" followed by one of the digits 3, 5, 7, 8, 9, and then must have exactly 8 digits from 0 to 9.',
        ];
    }
}
