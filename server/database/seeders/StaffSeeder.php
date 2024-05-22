<?php

namespace Database\Seeders;

use App\Models\Staff;
use Illuminate\Database\Seeder;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Staff::create([
            "staff_id" => "1",
            "staff_name" => "Ly Kien Huy",
            "staff_birthday" => "14/11/2002",
            "staff_image" => "",
            "staff_phone" => "0923465389",
            "staff_idcard" => "076234567356",
            "staff_address" => "Q5",
            "position_id" => "3"
        ]);
    }
}
