<?php

use App\Http\Controllers\Api\RoleController;
use App\Http\Middleware\Auth;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'roles',
    'middleware' => 'auth:api'
], function () {
    Route::get('/', [RoleController::class, 'index']);
    Route::get('/{id}', [RoleController::class, 'show']);
    Route::post('/', [RoleController::class, 'store']);
    Route::put('/{id}', [RoleController::class, 'update']);
    Route::delete('/{id}', [RoleController::class, 'destroy']);
});