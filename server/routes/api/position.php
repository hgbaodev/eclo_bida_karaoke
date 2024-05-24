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
    Route::get('/{active}', [PositionController::class, 'show']);
    Route::post('/', [PositionController::class, 'store']);
    Route::put('/{active}', [PositionController::class, 'update']);
    Route::delete('/{active}', [PositionController::class, 'destroy']);
  }
);
