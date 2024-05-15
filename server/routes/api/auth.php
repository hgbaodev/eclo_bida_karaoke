<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('me', [AuthController::class, 'me']);
    });
});
