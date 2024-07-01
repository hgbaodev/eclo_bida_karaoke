<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServiceDeviceDetail;
class ServiceDeviceDetailSeeder extends Seeder
{
    public function run(): void
    {
        ServiceDeviceDetail::factory()->count(99)->create();
    }
}
