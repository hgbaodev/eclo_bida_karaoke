<?php

namespace App\Http\Helpers;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;

class HelperRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->toArray();

        $formattedErrors = [];
        foreach ($errors as $field => $messages) {
            $formattedErrors[$field] = $messages[0]; 
        }

        throw new HttpResponseException(response()->json([
            'errors' => $formattedErrors,
        ], Response::HTTP_UNPROCESSABLE_ENTITY));
    }
}