<?php

use App\Http\Controllers\Api\RoleController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'roles',
    // 'middleware' => 'auth:api'
], function () {
    Route::get('/', [RoleController::class, 'index'])->middleware('logger:roles,update');
    Route::get('/{id}', [RoleController::class, 'show'])->middleware('logger:roles,view');
    Route::post('/', [RoleController::class, 'store'])->middleware('logger:roles,create');
    Route::put('/{id}', [RoleController::class, 'update'])->middleware('logger:roles,update');
    Route::delete('/{id}', [RoleController::class, 'destroy'])->middleware('logger:roles,delete');
});