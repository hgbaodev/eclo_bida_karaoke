<?php

use App\Http\Controllers\Api\WorkShiftController;
use Illuminate\Support\Facades\Route;

Route::group(
    [
        'prefix' => 'workshifts',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/', [WorkShiftController::class, 'index']);
        Route::get('/{active}', [WorkShiftController::class, 'show']);
        Route::post('/', [WorkShiftController::class, 'store']);
        Route::put('/{active}', [WorkShiftController::class, 'update']);
        Route::delete('/{active}', [WorkShiftController::class, 'destroy']);
    }
);
