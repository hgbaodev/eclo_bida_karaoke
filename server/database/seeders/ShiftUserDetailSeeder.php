<?php

namespace Database\Seeders;

use App\Models\ShiftUserDetail;
use Illuminate\Database\Seeder;

class ShiftUserDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ShiftUserDetail::create([
            "staff_id" => "1",
            "shift_id" => "1",
            "day_of_week" => "Monday",
            "workshift_id" => "1"
        ]);
        ShiftUserDetail::create([
            "staff_id" => "3",
            "shift_id" => "3",
            "day_of_week" => "Monday",
            "workshift_id" => "1"
        ]);
        ShiftUserDetail::create([
            "staff_id" => "2",
            "shift_id" => "3",
            "day_of_week" => "Tuesday",
            "workshift_id" => "1"
        ]);
        ShiftUserDetail::create([
            "staff_id" => "4",
            "shift_id" => "2",
            "day_of_week" => "Monday",
            "workshift_id" => "1"
        ]);
    }
}
