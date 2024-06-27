<?php

namespace App\Http\Requests\Shift;

use App\Http\Helpers\HelperRequest;
use Illuminate\Validation\Rule;

class ShiftRequest extends HelperRequest
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
            "time_in" => "required",
            "time_out" => "required",
            "status" => "required",
            "shift_type" => ["required", Rule::in(['P', 'F'])]
        ];
    }
}
