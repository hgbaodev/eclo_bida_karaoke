<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;
use App\Http\Controllers\Api\DeviceController;

Route::group(
    ['prefix' => 'devices',
        // 'middleware' => 'auth:api'
    ], function(){
    Route::get('/', [DeviceController::class, 'index']);
    Route::get('/{active}', [DeviceController::class, 'show']);
    Route::post('/', [DeviceController::class, 'store']);
    Route::put('/{active}', [DeviceController::class, 'update']);
    Route::delete('/{active}', [DeviceController::class, 'destroy']);
}
);
