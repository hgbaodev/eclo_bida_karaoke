<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;
use App\Http\Controllers\Api\ProductTypeController;

Route::group(
    [
        'prefix' => 'product_types',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/', [ProductTypeController::class, 'index']);
        Route::get('/{active}', [ProductTypeController::class, 'show']);
        Route::post('/', [ProductTypeController::class, 'store']);
        Route::put('/{active}', [ProductTypeController::class, 'update']);
        Route::delete('/{active}', [ProductTypeController::class, 'destroy']);
    }
);
