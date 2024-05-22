<?php

use App\Http\Controllers\StaffController;
use Illuminate\Support\Facades\Route;

Route::group(
  ['prefix' => 'staffs',
    // 'middleware' => 'auth:api'
], function(){
  Route::get('/', [StaffController::class, 'index']);
  Route::get('/{id}', [StaffController::class, 'show']);
  Route::post('/', [StaffController::class, 'store']);
  Route::put('/{id}', [StaffController::class, 'update']);
  Route::delete('/{id}', [StaffController::class, 'destroy']);
}
);