<?php

namespace App\Http\Requests\ServiceType;

use App\Http\Helpers\HelperRequest;
use Illuminate\Foundation\Http\FormRequest;

class StoreServiceTypeRequest extends HelperRequest
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
            'name' => ['required',],
            'status' => 'required|in:A,D',
        ];
    }
}
