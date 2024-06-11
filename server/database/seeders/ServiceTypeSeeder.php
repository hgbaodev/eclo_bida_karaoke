<?php

namespace Database\Seeders;

use App\Models\ServiceType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ServiceType::create(['name' => 'Table Bida', 'status' => 'A']);
        ServiceType::create(['name' => 'Room Karaoke', 'status' => 'A']);
    }
}