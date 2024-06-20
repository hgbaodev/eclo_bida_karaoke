<?php

namespace Database\Seeders;


use App\Models\WorkShift;
use Illuminate\Database\Seeder;

class WorkShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        WorkShift::create([
            "date_start" => "2024-06-10",
            "date_end" => "2024-06-21"
        ]);
        WorkShift::create([
            "date_start" => "2024-06-22",
            "date_end" => "2024-06-30"
        ]);
    }
}
