<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Position::create([
            "name" => "Giám đốc",
            "base_salary" => 40000000,
            "salary_structure" => "Month",
            "status" => "A"
        ]);
        Position::create([
            "name" => "Quản lý nhân sự",
            "base_salary" => 15000000,
            "salary_structure" => "Month",
            "status" => "A"
        ]);
        Position::create([
            "name" => "Quản lý cửa hàng",
            "base_salary" => 15000000,
            "salary_structure" => "Month",
            "status" => "A"
        ]);
        Position::create([
            "name" => "Nhân viên",
            "base_salary" => 35000,
            "salary_structure" => "Hour",
            "status" => "A"
        ]);
        Position::create([
            "name" => "Đầu bếp",
            "base_salary" => 14000000,
            "salary_structure" => "Month",
            "status" => "A"
        ]);
        Position::create([
            "name" => "Nhân viên pha chế",
            "base_salary" => 30000,
            "salary_structure" => "Hour",
            "status" => "A"
        ]);
    }
}
