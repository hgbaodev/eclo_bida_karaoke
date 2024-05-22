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
            "id" => "1",
            "name" => "Ly Kien Huy",
            "birthday" => "2002-11-14",
            "image" => "",
            "phone" => "0923465389",
            "idcard" => "076234567356",
            "address" => "Q5",
            "position_id" => 3
        ]);
    }
}
