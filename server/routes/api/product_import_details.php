<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;
use App\Http\Controllers\Api\ProductImpDetailController;

Route::group(
    [
        'prefix' => 'product_import_details',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/', [ProductImpDetailController::class, 'index']);
        Route::get('/{active}', [ProductImpDetailController::class, 'show']);
        Route::post('/', [ProductImpDetailController::class, 'store']);
        Route::put('/{active}', [ProductImpDetailController::class, 'update']);
        Route::delete('/{active}', [ProductImpDetailController::class, 'destroy']);
    }
);