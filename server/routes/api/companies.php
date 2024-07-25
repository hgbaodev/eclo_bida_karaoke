<?php

use App\Http\Controllers\Api\CompanyController;
use Illuminate\Support\Facades\Route;

Route::group(
    [
        'prefix' => 'companies',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::post('/', [CompanyController::class, 'store']);
        Route::get('/', [CompanyController::class, 'index']);
        Route::delete('/{active}', [CompanyController::class, 'destroy']);
    }
);
