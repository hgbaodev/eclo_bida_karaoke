<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create([
            'name' => 'view',
        ]);
        Permission::create([
            'name' => 'create',
        ]);
        Permission::create([
            'name' => 'update',
        ]);
        Permission::create([
            'name' => 'delete',
        ]);
    }
}
