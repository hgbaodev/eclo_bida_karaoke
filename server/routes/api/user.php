<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'users',
    'middleware' => 'auth:api'
], function () {
    Route::get('/', [UserController::class, 'index'])->middleware('logger:users,view');
    Route::get('/{active}', [UserController::class, 'show']);
    Route::post('/', [UserController::class, 'store'])->middleware('logger:users,create');
    Route::put('/{active}', [UserController::class, 'update'])->middleware('logger:users,update');
    Route::delete('/{active}', [UserController::class, 'destroy'])->middleware('logger:users,delete');
});