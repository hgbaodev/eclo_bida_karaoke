<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1'
], function () {
    require __DIR__ . '/api/auth.php';
    require __DIR__ . '/api/role.php';
    require __DIR__ . '/api/user.php';
    require __DIR__ . '/api/customer.php';
    require __DIR__ . '/api/supplier.php';
    require __DIR__ . '/api/area.php';
    require __DIR__ . '/api/device.php';
    require __DIR__ . '/api/service_type.php';
    require __DIR__ . '/api/staff.php';
    require __DIR__ . '/api/shift.php';
    require __DIR__ . '/api/position.php';
    require __DIR__ . '/api/logger.php';
    require __DIR__ . '/api/product_import.php';
    require __DIR__ . '/api/product.php';
    require __DIR__ . '/api/product_import_details.php';
    require __DIR__ . '/api/price.php';
});
