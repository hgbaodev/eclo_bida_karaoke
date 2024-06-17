<?php

namespace Database\Seeders;

use App\Models\Price;
use App\Models\ServiceType;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $idTable = ServiceType::where('name', 'Table Bida')->first()->id;
        $idRoom = ServiceType::where('name', 'Room Karaoke')->first()->id;
        Price::create([
            'name' => 'Table Vip 1',
            'status' => 'A',
            'pricePerHour' => 4,
            'service_type_id' => $idTable,
        ]);
        Price::create([
            'name' => 'Table Vip 2',
            'status' => 'A',
            'pricePerHour' => 5,
            'service_type_id' => $idTable,
        ]);
        Price::create([
            'name' => 'Table Vip 3',
            'status' => 'A',
            'pricePerHour' => 6,
            'service_type_id' => $idTable,
        ]);
        Price::create([
            'name' => 'Room Vip 1',
            'status' => 'A',
            'pricePerHour' => 7,
            'service_type_id' => $idRoom,
        ]);
        Price::create([
            'name' => 'Room Vip 2',
            'status' => 'A',
            'pricePerHour' => 8,
            'service_type_id' => $idRoom,
        ]);
        Price::create([
            'name' => 'Room Vip 3',
            'status' => 'A',
            'pricePerHour' => 9,
            'service_type_id' => $idRoom,
        ]);
    }
}
