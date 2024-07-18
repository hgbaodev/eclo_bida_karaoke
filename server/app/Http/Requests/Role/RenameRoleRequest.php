<?php

namespace App\Http\Requests\Role;

use App\Http\Helpers\HelperRequest;
use Illuminate\Validation\Rule;

class RenameRoleRequest extends HelperRequest
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
        $id = $this->route('id');
        return [
            'name' => ['required', Rule::unique('roles')->ignore($id, 'id')],
            'color' => ['required', Rule::unique('roles')->ignore($id, 'id')],
        ];
    }
}
