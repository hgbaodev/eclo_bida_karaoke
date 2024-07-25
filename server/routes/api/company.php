<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CompanyController;

Route::group(
    [
        'prefix' => 'companies',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/', [CompanyController::class, 'index']);
        Route::get('/{active}', [CompanyController::class, 'show']);
        Route::post('/', [CompanyController::class, 'store']);
        Route::put('/{active}', [CompanyController::class, 'update']);
        Route::delete('/{active}', [CompanyController::class, 'destroy']);
    }
);