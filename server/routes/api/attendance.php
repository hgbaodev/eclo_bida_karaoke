<?php

use App\Http\Controllers\Api\ShiftController;
use Illuminate\Support\Facades\Route;

Route::group(
  [
    'prefix' => 'attendances',
    // 'middleware' => 'auth:api'
  ],
  function () {
    Route::get('/', [ShiftController::class, 'index']);
    Route::get('/{active}', [ShiftController::class, 'show']);
    Route::post('/', [ShiftController::class, 'store']);
    Route::put('/{active}', [ShiftController::class, 'update']);
    Route::delete('/{active}', [ShiftController::class, 'destroy']);
  }
);
