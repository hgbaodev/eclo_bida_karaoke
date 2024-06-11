<?php

namespace App\Http\Requests\Service;

use App\Http\Helpers\HelperRequest;

class ChangeStatusServiceRequest extends HelperRequest
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
      'status' => 'required|in:A,D',
    ];
  }
}