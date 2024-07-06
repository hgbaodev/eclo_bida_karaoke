<?php

use App\Http\Controllers\Api\StatisticalController;
use Illuminate\Support\Facades\Route;

Route::group(
    [
        'prefix' => 'statistical',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::get('/over-view', [StatisticalController::class, 'getOverview']);
        Route::get('/time', [StatisticalController::class, 'getTime']);
    }
);
