<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\ServiceType;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $idTable = ServiceType::where('name', 'Table Bida')->first()->id;
        $idRoom = ServiceType::where('name', 'Room Karaoke')->first()->id;
        $arrTables = ['Table Vip 1', 'Table Vip 2', 'Table Vip 3', 'Table Vip 4', 'Table Vip 5',  'Table Vip 6'];
        $arrRooms = ['Room Vip 1', 'Room Vip 2', 'Room Vip 3', 'Room Vip 4', 'Room Vip 5',  'Room Vip 6'];
        //create tables
        foreach ($arrTables as $item) {
            Service::create([
                'name' => $item,
                'description' => 'Table just for 4 people',
                'status' => 'A',
                'area_id' => 1,
                'service_type_id' => $idTable,
                'price_id' => 1,
            ]);
        }
        //create rooms
        for ($x = 0; $x < count($arrRooms); $x++) {
            Service::create([
                'name' => $arrRooms[$x],
                'description' => 'Room just for 10 people',
                'status' => 'A',
                'area_id' => 2,
                'service_type_id' => $idRoom,
                'price_id' => 2,
            ]);
        }
    }
}
