<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            FuncationalSeeder::class,
            RoleFunctionalPermissionSeeder::class,
            UserSeeder::class,
            AreaSeeder::class,
            ShiftSeeder::class,
            PositionSeeder::class,
            StaffSeeder::class,
            CustomerSeeder::class,
            DeviceSeeder::class,
            SupplierSeeder::class,
            ServiceTypeSeeder::class,
            ProductTypeSeeder::class,
            ProductSeeder::class,
            ProductImportSeeder::class,
            PriceSeeder::class,
            WorkShiftSeeder::class,
            ShiftDetailSeeder::class,
            ShiftUserDetailSeeder::class,
            ServiceSeeder::class,
            ShiftDetailSeeder::class,
            OrderSeeder::class,
            ProductImportDetailSeeder::class,
            ServiceSeeder::class,
            ShiftDetailSeeder::class,
            ShiftDetailSeeder::class,
            ServiceSeeder::class,
            AttendanceSeeder::class,
            KitchenOrderSeeder::class,
            ServiceDeviceDetailSeeder::class,
        ]);
    }
}
