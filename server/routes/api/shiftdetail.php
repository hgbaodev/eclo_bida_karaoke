<?php

use App\Http\Controllers\Api\ShiftDetailController;
use Illuminate\Support\Facades\Route;

Route::group(
    [
        'prefix' => 'shiftdetails',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/', [ShiftDetailController::class, 'index']);
        Route::get('/{active}', [ShiftDetailController::class, 'show']);
        Route::post('/', [ShiftDetailController::class, 'store']);
        Route::put('/{active}', [ShiftDetailController::class, 'update']);
        Route::delete('/{active}', [ShiftDetailController::class, 'destroy']);
    }
);
