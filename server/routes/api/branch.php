<?php

use App\Http\Controllers\Api\BranchController;
use Illuminate\Support\Facades\Route;

Route::group(
    [
        'prefix' => 'branchs',
        // 'middleware' => 'auth:api'
    ],
    function () {
        Route::post('/', [BranchController::class, 'store']);
        Route::get('/', [BranchController::class, 'index']);
        Route::put('/{active}', [BranchController::class, 'update']);
        Route::delete('/{active}', [BranchController::class, 'destroy']);
    }
);
