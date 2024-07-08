<?php

use App\Http\Controllers\Api\SalaryController;
use Illuminate\Support\Facades\Route;

Route::group(
    [
        'prefix' => 'salaries',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/', [SalaryController::class, 'index']);
        Route::get('/{active}', [SalaryController::class, 'show']);
        Route::post('/', [SalaryController::class, 'store']);
        Route::put('/', [SalaryController::class, 'update']);
        // Route::delete('/{uuid}/{day}', [SalaryController::class, 'destroy']);
    }
);
