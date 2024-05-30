<?php

use App\Http\Controllers\Api\CustomerController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;

Route::group(
  ['prefix' => 'customers',
    // 'middleware' => 'auth:api'
], function(){
  Route::get('/', [CustomerController::class, 'index']);
  Route::get('/{active}', [CustomerController::class, 'show']);
  Route::post('/', [CustomerController::class, 'store']);
  Route::put('/{active}', [CustomerController::class, 'update']);
  Route::delete('/{active}', [CustomerController::class, 'destroy']);
}
);
