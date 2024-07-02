<?php

namespace App\Http\Requests\Staff;

use App\Http\Helpers\HelperRequest;
use Illuminate\Validation\Rule;

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
            'first_name' => 'required',
            'last_name' => 'required',
            'phone' => 'required|unique:staff|regex:/^[0-9]{10}$/',
            'idcard' => 'required|unique:staff|regex:/^[0-9]{12}$/',
            'birthday' => 'required',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'gender' => ['required', Rule::in(['F', 'M'])],
            'address' => 'required',
            'position' => 'required',
            'status' => 'required',
            'user' => 'nullable',
        ];
    }
}
