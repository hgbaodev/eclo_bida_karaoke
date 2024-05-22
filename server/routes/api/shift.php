<?php

use App\Http\Controllers\ShiftController;
use Illuminate\Support\Facades\Route;

Route::group(
  ['prefix' => 'shifts',
    // 'middleware' => 'auth:api'
], function(){
  Route::get('/', [ShiftController::class, 'index']);
  Route::get('/{id}', [ShiftController::class, 'show']);
  Route::post('/', [ShiftController::class, 'store']);
  Route::put('/{id}', [ShiftController::class, 'update']);
  Route::delete('/{id}', [ShiftController::class, 'destroy']);
}
);