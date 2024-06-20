<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OrderController;

Route::group(
    [
        'prefix' => 'orders',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::get('/requested-products', [OrderController::class, 'requestedProducts']);
        Route::post(
            '/mark-notification-as-read',
            [OrderController::class, 'markOrderRequestAsRead']
        )->middleware(
            'mark.orderRequestAsRead.event'
        );
        Route::get('/{active}', [OrderController::class, 'show']);
        Route::post('/{active}/products', [OrderController::class, 'addProductsToOrder'])->middleware('dispatch.order.event');
        Route::post('/', [OrderController::class, 'store']);
    }
);
