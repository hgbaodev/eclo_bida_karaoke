<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;
use App\Http\Controllers\Api\SupplierController;

Route::group(
    ['prefix' => 'suppliers',
        // 'middleware' => 'auth:api'
    ], function(){
    Route::get('/', [SupplierController::class, 'index']);
    Route::get('/{active}', [SupplierController::class, 'show']);
    Route::post('/', [SupplierController::class, 'store']);
    Route::put('/{active}', [SupplierController::class, 'update']);
    Route::delete('/{active}', [SupplierController::class, 'destroy']);
}
);
