<?php

use App\Http\Controllers\Api\ServiceDeviceDetailController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;

Route::group(
    ['prefix' => 'service-device-detail',
        // 'middleware' => 'auth:api'
    ], function(){
    Route::get('/', [ServiceDeviceDetailController::class, 'index']);
    Route::get('/{active}', [ServiceDeviceDetailController::class, 'show']);
    Route::post('/', [ServiceDeviceDetailController::class, 'store']);
    Route::put('/{active}', [ServiceDeviceDetailController::class, 'update']);
    Route::delete('/{active}', [ServiceDeviceDetailController::class, 'destroy']);
}
);
