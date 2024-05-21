<?php

use App\Http\Controllers\PositionController;
use Illuminate\Support\Facades\Route;

Route::group(
  ['prefix' => 'customers',
    // 'middleware' => 'auth:api'
], function(){
  Route::get('/position', [PositionController::class, 'index']);
  Route::get('/position/{id}', [PositionController::class, 'show']);
  Route::post('/position', [PositionController::class, 'store']);
  Route::put('/position/{id}', [PositionController::class, 'update']);
  Route::delete('/position/{id}', [PositionController::class, 'destroy']);
}
);