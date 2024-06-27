<?php

use App\Http\Controllers\Api\AttendanceController;
use Illuminate\Support\Facades\Route;

Route::group(
  [
    'prefix' => 'attendances',
    // 'middleware' => 'auth:api'
  ],
  function () {
    Route::get('/', [AttendanceController::class, 'index']);
    Route::get('/{active}', [AttendanceController::class, 'show']);
    Route::post('/', [AttendanceController::class, 'store']);
    Route::put('/{active}', [AttendanceController::class, 'update']);
    Route::delete('/{active}', [AttendanceController::class, 'destroy']);
  }
);
