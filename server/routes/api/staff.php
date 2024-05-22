<?php

use App\Http\Controllers\StaffController;
use Illuminate\Support\Facades\Route;

Route::group(
  ['prefix' => 'customers',
    // 'middleware' => 'auth:api'
], function(){
  Route::get('/staff', [StaffController::class, 'index']);
  Route::get('/staff/{id}', [StaffController::class, 'show']);
  Route::post('/staff', [StaffController::class, 'store']);
  Route::put('/staff/{id}', [StaffController::class, 'update']);
  Route::delete('/staff/{id}', [StaffController::class, 'destroy']);
}
);