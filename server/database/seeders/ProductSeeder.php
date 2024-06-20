<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            "name" => "Sting",
            "selling_price" => 50000,
            "quantity" => 18,
            "id_type" => 1,

        ]);
        Product::create([
            "name" => "C2",
            "selling_price" => 60000,
            "quantity" => 19,
            "id_type" => 1,
        ]);
        Product::create([
            "name" => "Olong",
            "selling_price" => 70000,
            "quantity" => 20,
            "id_type" => 1,
        ]);
        Product::create([
            "name" => "7Up",
            "selling_price" => 80000,
            "quantity" => 21,
            "id_type" => 1,
        ]);
    }
}
