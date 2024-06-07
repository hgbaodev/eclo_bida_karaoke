<?php

use App\Http\Controllers\Api\StaffController;
use Illuminate\Support\Facades\Route;

Route::group(
  [
    'prefix' => 'staffs',
    // 'middleware' => 'auth:api'
  ],
  function () {
    Route::get('/', [StaffController::class, 'index']);
    Route::get('/list', [StaffController::class, 'list']);
    Route::get('/{active}', [StaffController::class, 'show']);
    Route::post('/', [StaffController::class, 'store']);
    Route::put('/{active}', [StaffController::class, 'update']);
    Route::delete('/{active}', [StaffController::class, 'destroy']);
  }
);
