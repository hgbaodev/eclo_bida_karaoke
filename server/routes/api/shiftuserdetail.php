<?php

use App\Http\Controllers\Api\ShiftUserDetailController;
use Illuminate\Support\Facades\Route;

Route::group(
    [
        'prefix' => 'shiftuserdetails',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/', [ShiftUserDetailController::class, 'index']);
        Route::get('/{active}', [ShiftUserDetailController::class, 'show']);
        Route::post('/', [ShiftUserDetailController::class, 'store']);
        Route::put('/{active}', [ShiftUserDetailController::class, 'update']);
        Route::delete('/{active}', [ShiftUserDetailController::class, 'destroy']);
    }
);
