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
            "time_in" => "9:00",
            "time_out" => "13:00",
            "status" => "A",
            "shift_type" => "P"
        ]);
        Shift::create([
            "time_in" => "13:00",
            "time_out" => "17:00",
            "status" => "A",
            "shift_type" => "P"
        ]);
        Shift::create([
            "time_in" => "17:00",
            "time_out" => "21:00",
            "status" => "A",
            "shift_type" => "P"
        ]);
        Shift::create([
            "time_in" => "9:00",
            "time_out" => "18:00",
            "status" => "A",
            "shift_type" => "F"
        ]);
        Shift::create([
            "time_in" => "18:00",
            "time_out" => "3:00",
            "status" => "A",
            "shift_type" => "F"
        ]);
    }
}
