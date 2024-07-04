<?php

namespace App\Http\Requests\DayOff;

use App\Http\Helpers\HelperRequest;

class DayOffRequest extends HelperRequest
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
            'staff_id' => 'required',
            'day_off' => 'required',
            'reason' => 'nullable',
            'type' => 'required',
        ];
    }
}
