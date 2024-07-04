<?php

use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Auth;

Route::group(
    [
        'prefix' => 'invoices',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/', [OrderController::class, 'getInvoices']);
    }
);
