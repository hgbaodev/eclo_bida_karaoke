<?php

namespace App\Http\Requests\Companies;


use App\Http\Helpers\HelperRequest;

class StoreCompanyRequest extends HelperRequest

{

  public function authorize(): bool
  {
    return true;
  }


  public function rules(): array
  {
    return [
      'name' => 'required',
      'first_name' => 'required',
      'last_name' => 'required',
      'email' => 'required|email|unique:users,email',
      'password' => 'required|min:6',
    ];
  }
}
