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
            "name" => "Giám đốc",
            "salary" => "40000000",
            "status" => "A"
        ]);
        Position::create([
            "name" => "Quản lý nhân sự",
            "salary" => "15000000",
            "status" => "A"
        ]);
        Position::create([
            "name" => "Quản lý cửa hàng",
            "salary" => "15000000",
            "status" => "A"
        ]);
        Position::create([
            "name" => "Nhân viên",
            "salary" => "8000000",
            "status" => "A"
        ]);
    }
}
