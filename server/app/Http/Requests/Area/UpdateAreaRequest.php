<?php

namespace App\Http\Requests\Area;

use App\Http\Helpers\HelperRequest;
use Illuminate\Validation\Rule;

class UpdateAreaRequest extends HelperRequest
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
        $active = $this->route('active');
        return [
            'name' => ['required', Rule::unique('areas')->ignore($active, 'active')],
            'description' => 'required',
        ];
    }
}