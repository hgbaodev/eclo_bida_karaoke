<?php

namespace App\Http\Requests\ShiftUserDetail;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ShiftUserDetailRequest extends FormRequest
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
            "staff_id" => "required|exists:staff,id",
            "shift_id" => "required|exists:shifts,id",
            "day_of_week" => "required|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday",
            "active" => "required",
            "unique_combination" => Rule::unique('shift_user_details')
                ->where(function ($query) use ($data) {
                    return $query->where('shift_id', $data['shift_id'])
                        ->where('day_of_week', $data['day_of_week'])
                        ->where('staff_id', $data['staff_id']);
                })
        ];
    }
}
