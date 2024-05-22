<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;
use App\Http\Controllers\Api\ServiceTypeController;

Route::group(
    ['prefix' => 'service_types',
        // 'middleware' => 'auth:api'
    ], function(){
    Route::get('/', [ServiceTypeController::class, 'index']);
    Route::get('/{id}', [ServiceTypeController::class, 'show']);
    Route::post('/', [ServiceTypeController::class, 'store']);
    Route::put('/{id}', [ServiceTypeController::class, 'update']);
    Route::delete('/{id}', [ServiceTypeController::class, 'destroy']);
}
);
