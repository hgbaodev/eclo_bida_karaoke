<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;
use App\Http\Controllers\Api\ProductImportController;

Route::group(
    [
        'prefix' => 'product_imports',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/', [ProductImportController::class, 'index']);
        Route::get('/{active}', [ProductImportController::class, 'show']);
        Route::post('/', [ProductImportController::class, 'store']);
        Route::get('/update-total-cost/{active}', [ProductImportController::class, 'updateTotalCost']);
        Route::put('/{active}', [ProductImportController::class, 'update']);
        Route::delete('/{active}', [ProductImportController::class, 'destroy']);
    }
);
