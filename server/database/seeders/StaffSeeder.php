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
            "first_name" => "Van A",
            "last_name" => "Nguyen",
            "birthday" => "2002-11-14",
            "gender" => 'F',
            "image" => "",
            "phone" => "0923465389",
            "idcard" => "076234567356",
            "address" => "Q5",
            "uuid" => "QLCH-001",
            "status" => "A",
            "position_id" => 3,
            "user_id" => 1
        ]);
        Staff::create([
            "first_name" => "Van B",
            "last_name" => "Nguyen",
            "birthday" => "2002-01-14",
            "gender" => 'F',
            "image" => "",
            "phone" => "0923465384",
            "idcard" => "076234567366",
            "address" => "Q5",
            "uuid" => "GD-001",
            "status" => "A",
            "position_id" => 1,
            "user_id" => 2
        ]);
        Staff::create([
            "first_name" => "Van C",
            "last_name" => "Nguyen",
            "birthday" => "2002-01-14",
            "gender" => 'F',
            "image" => "",
            "phone" => "0923465334",
            "idcard" => "076234557366",
            "address" => "Q5",
            "uuid" => "QLNS-001",
            "status" => "A",
            "position_id" => 2,
            "user_id" => 3
        ]);
        Staff::create([
            "first_name" => "Van D",
            "last_name" => "Nguyen",
            "birthday" => "2002-02-13",
            "gender" => 'M',
            "image" => "",
            "phone" => "0923464389",
            "idcard" => "077234567356",
            "address" => "Q5",
            "uuid" => "NV-001",
            "status" => "A",
            "position_id" => 4,
            "user_id" => 4
        ]);
        Staff::create([
            "first_name" => "Van F",
            "last_name" => "Nguyen",
            "birthday" => "1999-05-12",
            "gender" => 'M',
            "image" => "",
            "phone" => "0923464489",
            "idcard" => "077234560356",
            "address" => "Q5",
            "uuid" => "NV-002",
            "status" => "A",
            "position_id" => 4,
            "user_id" => 5
        ]);
        Staff::create([
            "first_name" => "Van E",
            "last_name" => "Nguyen",
            "birthday" => "1999-01-12",
            "gender" => 'M',
            "image" => "",
            "phone" => "0923064389",
            "idcard" => "077230567356",
            "address" => "Q5",
            "uuid" => "NV-003",
            "status" => "A",
            "position_id" => 4,
            "user_id" => 6
        ]);
        // Staff::factory()->count(20)->create();
    }
}
