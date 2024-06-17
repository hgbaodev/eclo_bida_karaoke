<?php

namespace App\Http\Requests\ShiftDetail;

use App\Http\Helpers\HelperRequest;
use Illuminate\Validation\Rule;

class ShiftDetailRequest extends HelperRequest
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
        $data = $this->all();
        return [
            "day_of_week" => "required",
            "quantity_of_staff" => "required|regex:/^\d+$/",
            "shift_id" => [
                "required",
                Rule::unique('shift_details')->where(function ($query) use ($data) {
                    return $query->where('day_of_week', $data['day_of_week']);
                })
            ],
        ];
    }
}
