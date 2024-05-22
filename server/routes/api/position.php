<?php

use App\Http\Controllers\Api\PositionController;
use Illuminate\Support\Facades\Route;

Route::group(
  [
    'prefix' => 'positions',
    // 'middleware' => 'auth:api'
  ],
  function () {
    Route::get('/', [PositionController::class, 'index']);
    Route::get('/{id}', [PositionController::class, 'show']);
    Route::post('/', [PositionController::class, 'store']);
    Route::put('/{id}', [PositionController::class, 'update']);
    Route::delete('/{id}', [PositionController::class, 'destroy']);
  }
);
