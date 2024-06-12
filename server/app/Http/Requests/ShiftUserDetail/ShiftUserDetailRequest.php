<?php

namespace App\Http\Requests\ShiftUserDetail;

use App\Http\Helpers\HelperRequest;

use Illuminate\Validation\Rule;

class ShiftUserDetailRequest extends HelperRequest
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
            "staff" => "required",
            "shift" => "required",
            "day_of_week" => "required|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday",
            "unique_combination" => Rule::unique('shift_user_details')
                ->where(function ($query) use ($data) {
                    return $query->where('shift', $data['shift'])
                        ->where('day_of_week', $data['day_of_week'])
                        ->where('staff', $data['staff']);
                })
        ];
    }
}
