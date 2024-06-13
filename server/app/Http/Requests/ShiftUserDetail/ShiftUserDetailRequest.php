<?php

namespace App\Http\Requests\ShiftUserDetail;

use App\Http\Helpers\HelperRequest;
use App\Models\Staff;
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

        // Kiểm tra xem 'staff' có tồn tại trong mảng không
        if (!isset($data["staff"])) {
            return [];
        }

        $staff = Staff::where("active", $data["staff"])->first();

        // Kiểm tra xem $staff có tồn tại không
        if (!$staff) {
            return [];
        }

        $data["staff_id"] = $staff->id;

        return [
            "staff" => [
                "required",
                Rule::unique('shift_user_details', 'staff_id')->where(function ($query) use ($data) {
                    return $query->where('staff_id', $data["staff_id"])
                        ->where('day_of_week', $data['day_of_week']);
                }),
            ],
            "shift" => "required",
            "day_of_week" => "required|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday",
        ];
    }
}
