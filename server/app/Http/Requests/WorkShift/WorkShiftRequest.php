<?php

namespace App\Http\Requests\WorkShift;

use App\Http\Helpers\HelperRequest;


class WorkShiftRequest extends HelperRequest
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
            'date_start' => 'required',
            'date_end' => 'required'
        ];
    }
}
