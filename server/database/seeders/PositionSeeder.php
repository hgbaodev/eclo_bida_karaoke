<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Position::create([
            "position" => "1",
            "position_name" => "Giám đốc",
            "position_salary" => "40000000"
        ]);
        Position::create([
            "position" => "2",
            "position_name" => "Quản lý nhân sự",
            "position_salary" => "15000000"
        ]);
        Position::create([
            "position" => "3",
            "position_name" => "Quản lý cửa hàng",
            "position_salary" => "15000000"
        ]);
        Position::create([
            "position" => "4",
            "position_name" => "Nhân viên",
            "position_salary" => "8000000"
        ]);
    }
}
