<?php

use App\Http\Controllers\ShiftController;
use Illuminate\Support\Facades\Route;

Route::group(
  ['prefix' => 'customers',
    // 'middleware' => 'auth:api'
], function(){
  Route::get('/shift', [ShiftController::class, 'index']);
  Route::get('/shift/{id}', [ShiftController::class, 'show']);
  Route::post('/shift', [ShiftController::class, 'store']);
  Route::put('/shift/{id}', [ShiftController::class, 'update']);
  Route::delete('/shift/{id}', [ShiftController::class, 'destroy']);
}
);