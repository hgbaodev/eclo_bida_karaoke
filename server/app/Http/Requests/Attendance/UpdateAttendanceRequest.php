<?php

namespace App\Http\Requests\Attendance;

use App\Http\Helpers\HelperRequest;

class UpdateAttendanceRequest extends HelperRequest
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
            "time" => 'nullable',
            "day" => "required",
            "uuid" => "required",
            "check_in" => 'nullable',
            "check_out" => "nullable",
            "type" => 'nullable',
            "update" => 'required'
        ];
    }
}
