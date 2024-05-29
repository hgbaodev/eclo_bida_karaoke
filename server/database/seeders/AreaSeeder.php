<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Area;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Area::create([
            'name' => 'Vip 1',
            'description' => 'Khu vip pro 1'
        ]);

        Area::create([
            'name' => 'Vip 2',
            'description' => 'Khu dành cho khách vip 2'
        ]);
    }
}
