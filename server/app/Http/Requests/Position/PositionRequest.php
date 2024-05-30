<?php

namespace App\Http\Requests\Position;

use App\Http\Helpers\HelperRequest;


class PositionRequest extends HelperRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "position_name" => "required",
            "position_salary" => "required|regex:/^[0-9]{7,}$/"
        ];
    }
}
