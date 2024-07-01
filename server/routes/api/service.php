<?php

use App\Http\Controllers\Api\ServiceController;
use Illuminate\Support\Facades\Route;

Route::group(
  [
    'prefix' => 'services',
    // 'middleware' => 'auth:api'
  ],
  function () {
    Route::get('/', [ServiceController::class, 'index']);
      Route::get('/{active}', [ServiceController::class, 'show']);
    Route::post('/', [ServiceController::class, 'store']);
    Route::put('/{active}/change_status', [ServiceController::class, 'changeStatus']);
    Route::put('/{active}', [ServiceController::class, 'update']);
    Route::delete('/{active}', [ServiceController::class, 'destroy']);
  }
);
