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
            "time_out" => "15:00",
            "status" => "A"
        ]);
        Shift::create([
            "time_in" => "15:00",
            "time_out" => "22:00",
            "status" => "A"
        ]);
        Shift::create([
            "time_in" => "12:00",
            "time_out" => "19:00",
            "status" => "A"
        ]);
        Shift::create([
            "time_in" => "10:00",
            "time_out" => "17:00",
            "status" => "A"
        ]);
        Shift::create([
            "time_in" => "14:00",
            "time_out" => "21:00",
            "status" => "A"
        ]);
        Shift::create([
            "time_in" => "8:00",
            "time_out" => "14:00",
            "status" => "A"
        ]);
    }
}
