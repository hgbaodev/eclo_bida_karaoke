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
            "name" => "Ly Kien Huy",
            "birthday" => "2002-11-14",
            "image" => "",
            "phone" => "0923465389",
            "idcard" => "076234567356",
            "address" => "Q5",
            "status" => "A",
            "position_id" => 3
        ]);
        Staff::factory()->count(30)->create();
    }
}
