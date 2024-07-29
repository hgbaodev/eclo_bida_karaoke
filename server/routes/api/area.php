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
        Route::post('/', [AreaController::class, 'store'])->middleware('logger:area,add');
        Route::put('/{active}', [AreaController::class, 'update'])->middleware('logger:area,update');
        Route::delete('/{id}', [AreaController::class, 'destroy'])->middleware('logger:area,delete');
        Route::get('/services/all', [AreaController::class, 'getAllAreaWithServices']);
    }
);
