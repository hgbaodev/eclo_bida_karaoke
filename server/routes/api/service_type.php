<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;
use App\Http\Controllers\Api\ServiceTypeController;

Route::group(
    ['prefix' => 'service_types',
        // 'middleware' => 'auth:api'
    ], function(){
    Route::get('/', [ServiceTypeController::class, 'index']);
    Route::get('/{active}', [ServiceTypeController::class, 'show']);
    Route::post('/', [ServiceTypeController::class, 'store']);
    Route::put('/{active}', [ServiceTypeController::class, 'update']);
    Route::delete('/{active}', [ServiceTypeController::class, 'destroy']);
}
);
