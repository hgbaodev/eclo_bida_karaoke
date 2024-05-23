<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'users',
    // 'middleware' => 'auth:api'
], function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{active}', [UserController::class, 'show']);
    Route::post('/', [UserController::class, 'store']);
    Route::put('/{active}', [UserController::class, 'update']);
    Route::delete('/{active}', [UserController::class, 'destroy']);
});