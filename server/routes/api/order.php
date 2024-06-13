<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OrderController;
use App\Http\Middleware\markOrderRequestAsRead;

Route::group(
    ['prefix' => 'orders',
        // 'middleware' => 'auth:api'
    ], function(){
    Route::get('/', [OrderController::class, 'index']);
    Route::get('/{active}', [OrderController::class, 'show']);
    Route::post('/{active}/products', [OrderController::class, 'addProductsToOrder']);
    Route::post('/mark-notification-as-read', [OrderController::class, 'markOrderRequestAsRead'])->middleware('markOrderRequestAsRead');
    Route::get('/fiveLatestUnreadRequests', [OrderController::class, 'fiveLatestUnreadRequests']);
}
);
