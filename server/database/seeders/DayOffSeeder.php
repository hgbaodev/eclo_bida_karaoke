<?php

namespace Database\Seeders;

use App\Models\DayOffs;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DayOffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DayOffs::factory()->count(10)->create();
    }
}
