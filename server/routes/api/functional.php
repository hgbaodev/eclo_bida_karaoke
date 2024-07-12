<?php

use App\Http\Controllers\Api\FunctionalController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'functionals',
    // 'middleware' => 'auth:api'
], function () {
    Route::get('/', [FunctionalController::class, 'index']);
});
