<?php

namespace App\Http\Requests\Customer;

use App\Http\Helpers\HelperRequest;
use Illuminate\Validation\Rule;

class StoreCustomerRequest extends HelperRequest

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
            'first_name' => 'required',
            'last_name' => 'required',
            'phone' => ['required',
                        'regex:/^(0[3|5|7|8|9])+([0-9]{8})\b$/'],
            'email' => 'required|email|unique:customers',
            'status' => 'required|in:A,D',
        ];
    }

    public function messages(): array
    {
        return [
            'phone.regex' => 'Invalid phone number. Phone number must start with "0" followed by one of the digits 3, 5, 7, 8, 9, and then must have exactly 8 digits from 0 to 9.',
        ];
    }
}
