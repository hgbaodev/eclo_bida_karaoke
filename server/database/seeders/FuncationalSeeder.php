<?php

namespace Database\Seeders;

use App\Models\Functional;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FuncationalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Functional::create([
            'name' => 'account',
        ]);
        Functional::create([
            'name' => 'role',
        ]);
    }
}
