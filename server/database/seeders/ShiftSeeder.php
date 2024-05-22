<?php

namespace Database\Seeders;

use App\Models\Shift;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Shift::create([
            "time_in" => "8:00",
            "time_out" => "15:00"
        ]);
        Shift::create([
            "time_in" => "15:00",
            "time_out" => "22:00"
        ]);
    }
}
