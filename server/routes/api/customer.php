<?php

use App\Http\Controllers\Api\CustomerController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;

Route::group(
  ['prefix' => 'customers',
    // 'middleware' => 'auth:api'
], function(){
  Route::get('/', [CustomerController::class, 'index']);
  Route::get('/{id}', [CustomerController::class, 'show']);
  Route::post('/', [CustomerController::class, 'store']);
    Route::put('/{id}', [CustomerController::class, 'update']);
  Route::put('/{id}/test', [CustomerController::class, 'test']);
  Route::delete('/{id}', [CustomerController::class, 'destroy']);
}
);
