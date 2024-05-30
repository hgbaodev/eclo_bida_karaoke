<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;
use App\Http\Controllers\Api\ProductController;

Route::group(
    [
        'prefix' => 'products',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/', [ProductController::class, 'index']);
        Route::get('/{active}', [ProductController::class, 'show']);
        Route::post('/', [ProductController::class, 'store']);
        Route::put('/{active}', [ProductController::class, 'update']);
        Route::delete('/{active}', [ProductController::class, 'destroy']);
    }
);