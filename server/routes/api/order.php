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
        Route::get('/kitchen-orders', [OrderController::class, 'getKitchenOrders']);
        Route::post('/', [OrderController::class, 'store']);
        //mark as processing
        Route::put(
            '/mark-kitchen-order-as-processing/{active}',
            [OrderController::class, 'markKitchenOrderAsProcessing']
        )->middleware(
            'markKitchenOrderAsProcessingEvent'
        );
        //mark as waiting
        Route::put(
            '/mark-kitchen-order-as-waiting/{active}',
            [OrderController::class, 'markKitchenOrderAsWaiting']
        )->middleware(
            'markKitchenOrderAsWaitingEvent'
        );
//        mark as done
        Route::put(
            '/mark-kitchen-order-as-done/{active}',
            [OrderController::class, 'markKitchenOrderAsDone']
        )->middleware(
            'markKitchenOrderAsDoneEvent'
        );
        Route::get('/{active}', [OrderController::class, 'show']);
        Route::post('/{active}/products', [OrderController::class, 'addProductsToOrder'])->middleware('dispatch.order.event');
    }
);
