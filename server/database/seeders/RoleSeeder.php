<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'name' => 'Admin',
            'color' => 'rgba(23, 13, 102, 1)'
        ]);

        Role::create([
            'name' => 'User',
            'color' => 'rgba(20, 159, 10, 1)'
        ]);
    }
}