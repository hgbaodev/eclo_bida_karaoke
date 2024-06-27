<?php

namespace App\Http\Requests\Staff;

use App\Http\Helpers\HelperRequest;
use Illuminate\Validation\Rule;

class UpdateStaffRequest extends HelperRequest
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
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'phone' => ['required', 'regex:/^[0-9]{10}$/', Rule::unique('staff')->ignore($active, 'active')],
            'idcard' => ['required', 'regex:/^[0-9]{12}$/', Rule::unique('staff')->ignore($active, 'active')],
            'birthday' => 'required',
            'gender' => ['required', Rule::in(['F', 'M'])],
            'address' => 'required',
            'position' => 'required',
            'status' => 'required',
        ];
    }
}
