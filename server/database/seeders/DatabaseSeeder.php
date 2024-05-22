<?php

namespace Database\Seeders;

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
            StaffSeeder::class,
            PositionSeeder::class
        ]);
    }
}
