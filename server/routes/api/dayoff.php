<?php

use App\Http\Controllers\Api\DayOffController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;

Route::group(
    [
        'prefix' => 'day_offs',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/', [DayOffController::class, 'index']);
        Route::get('/{active}', [DayOffController::class, 'show']);
        Route::post('/', [DayOffController::class, 'store']);
        Route::put('/{active}', [DayOffController::class, 'update']);
        Route::delete('/{active}', [DayOffController::class, 'destroy']);
    }
);
