<?php

namespace App\Http\Requests\Staff;

use App\Http\Helpers\HelperRequest;

class StaffRequest extends HelperRequest
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
            'phone' => 'required|unique:staff|regex:/^[0-9]{10}$/',
            'idcard' => 'required|unique:staff|regex:/^[0-9]{12}$/',
            'birthday' => 'required',
            'address' => 'required',
            'position' => 'required',
            'status' => 'required',
            'user' => 'nullable'
        ];
    }
}
