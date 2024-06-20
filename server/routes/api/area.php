<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;
use App\Http\Controllers\Api\AreaController;

Route::group(
    [
        'prefix' => 'areas',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/', [AreaController::class, 'index']);
        Route::get('/{id}', [AreaController::class, 'show']);
        Route::post('/', [AreaController::class, 'store']);
        Route::put('/{active}', [AreaController::class, 'update']);
        Route::delete('/{id}', [AreaController::class, 'destroy']);
        Route::get('/services/all', [AreaController::class, 'getAllAreaWithServices']);
    }
);
