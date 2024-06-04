<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;
use App\Http\Controllers\Api\PriceController;

Route::group(
    ['prefix' => 'prices',
        // 'middleware' => 'auth:api'
    ], function(){
    Route::get('/', [PriceController::class, 'index']);
    Route::get('/{active}', [PriceController::class, 'show']);
    Route::post('/', [PriceController::class, 'store']);
    Route::put('/{active}', [PriceController::class, 'update']);
    Route::delete('/{active}', [PriceController::class, 'destroy']);
}
);
