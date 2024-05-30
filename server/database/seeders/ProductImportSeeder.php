<?php

namespace Database\Seeders;

use App\Models\ProductImport;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductImportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductImport::factory()->count(3)->create();
    }
}