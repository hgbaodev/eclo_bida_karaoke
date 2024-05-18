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
            'name' => 'View',
        ]);
        Permission::create([
            'name' => 'Create',
        ]);
        Permission::create([
            'name' => 'Update',
        ]);
        Permission::create([
            'name' => 'Delete',
        ]);
    }
}