<?php

namespace Database\Seeders;

use App\Models\KitchenOrder;
use App\Models\Shift;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
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
//            KitchenOrder::class,
        ]);
    }
}
