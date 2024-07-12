<?php

namespace Database\Seeders;

use App\Models\Functional;
use Illuminate\Database\Seeder;

class FuncationalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Functional::create([
            'name' => 'user',
        ]);
        Functional::create([
            'name' => 'customer',
        ]);
        Functional::create([
            'name' => 'logger',
        ]);
        Functional::create([
            'name' => 'import',
        ]);
        Functional::create([
            'name' => 'product',
        ]);
        Functional::create([
            'name' => 'kitchenorder',
        ]);
        Functional::create([
            'name' => 'supplier',
        ]);
        Functional::create([
            'name' => 'customer',
        ]);
        Functional::create([
            'name' => 'shiftdetail',
        ]);
        Functional::create([
            'name' => 'schedule',
        ]);
        Functional::create([
            'name' => 'dayoff',
        ]);
        Functional::create([
            'name' => 'attendance',
        ]);
        Functional::create([
            'name' => 'shifts',
        ]);
        Functional::create([
            'name' => 'position',
        ]);
        Functional::create([
            'name' => 'salary',
        ]);
        Functional::create([
            'name' => 'staff',
        ]);
        Functional::create([
            'name' => 'role',
        ]);
        Functional::create([
            'name' => 'device',
        ]);
        Functional::create([
            'name' => 'table&room',
        ]);
        Functional::create([
            'name' => 'servicetype',
        ]);
        Functional::create([
            'name' => 'price',
        ]);
        Functional::create([
            'name' => 'statistical',
        ]);
        Functional::create([
            'name' => 'revenue',
        ]);
        Functional::create([
            'name' => 'order',
        ]);
        Functional::create([
            'name' => 'dayoff',
        ]);
    }
}
