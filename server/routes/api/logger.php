<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LoggerController;

Route::group(
  [
    'prefix' => 'loggers',
    // 'middleware' => 'auth:api'
  ],
  function () {
    Route::get('/', [LoggerController::class, 'index']);
  }
);
