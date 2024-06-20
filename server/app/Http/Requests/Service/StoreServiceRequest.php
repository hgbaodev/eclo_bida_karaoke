<?php

namespace App\Http\Requests\Service;

use App\Http\Helpers\HelperRequest;

class StoreServiceRequest extends HelperRequest
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
      'name' => 'required',
      'description' => 'required',
      'status' => 'required|in:A,D',
      'area_active' => 'required|exists:areas,active',
      'price_active' => 'required|exists:prices,active',
      'service_type_active' => 'required|exists:service_types,active',
    ];
  }
}