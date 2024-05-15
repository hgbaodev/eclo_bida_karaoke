<?php

namespace Database\Seeders;

use App\Enums\PermissionEnum;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleFunctionalPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('role_functional_permissions')->insert([
            ['role_id' => 1,'functional_id' => 1,'permission_id' => PermissionEnum::VIEW],
            ['role_id' => 1,'functional_id' => 1,'permission_id' => PermissionEnum::CREATE],
            ['role_id' => 1,'functional_id' => 1,'permission_id' => PermissionEnum::UPDATE],
            ['role_id' => 1,'functional_id' => 1,'permission_id' => PermissionEnum::DELETE],
        ]);

        DB::table('role_functional_permissions')->insert([
            ['role_id' => 1,'functional_id' => 2,'permission_id' => PermissionEnum::CREATE],
            ['role_id' => 1,'functional_id' => 2,'permission_id' => PermissionEnum::UPDATE],
            ['role_id' => 1,'functional_id' => 2,'permission_id' => PermissionEnum::DELETE],
            ['role_id' => 1,'functional_id' => 2,'permission_id' => PermissionEnum::VIEW],
        ]);

        DB::table('role_functional_permissions')->insert([
            ['role_id' => 2,'functional_id' => 1,'permission_id' => PermissionEnum::CREATE],
        ]);
    }
}
