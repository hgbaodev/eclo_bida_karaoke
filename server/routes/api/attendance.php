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
    Route::post('/workshift', [AttendanceController::class, 'storeByWorkShift']);
    Route::put('/', [AttendanceController::class, 'update']);
    Route::delete('/{uuid}/{day}', [AttendanceController::class, 'destroy']);
  }
);
