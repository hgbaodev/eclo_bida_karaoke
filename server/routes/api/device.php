<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;
use App\Http\Controllers\Api\DeviceController;

Route::group(
    ['prefix' => 'devices',
        // 'middleware' => 'auth:api'
    ], function(){
    Route::get('/', [DeviceController::class, 'index']);
    Route::get('/{id}', [DeviceController::class, 'show']);
    Route::post('/', [DeviceController::class, 'store']);
    Route::put('/{id}', [DeviceController::class, 'update']);
    Route::delete('/{id}', [DeviceController::class, 'destroy']);
}
);
