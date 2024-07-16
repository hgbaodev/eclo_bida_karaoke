<?php

namespace App\Http\Requests\Salary;

use App\Http\Helpers\HelperRequest;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSalaryRequest extends HelperRequest
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
            "staff" => "required",
            "month" => "required|integer|between:1,12",
            "year" => "required|integer|min:2024",
            "working_days" => "required",
            "off_days" => "required"
        ];
    }
}
