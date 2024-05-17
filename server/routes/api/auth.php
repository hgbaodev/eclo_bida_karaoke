<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Middleware\Auth;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('signin', [AuthController::class, 'signin']);

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('singout', [AuthController::class, 'signout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});