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
            'name' => 'area',
        ]);
    }
}