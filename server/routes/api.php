<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1'
], function () {
    require __DIR__.'/api/auth.php';
    require __DIR__.'/api/role.php';
    require __DIR__.'/api/user.php';
    require __DIR__.'/api/customer.php';
});