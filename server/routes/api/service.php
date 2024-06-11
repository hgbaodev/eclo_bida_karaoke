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
    Route::post('/', [ServiceController::class, 'store']);
  }
);
