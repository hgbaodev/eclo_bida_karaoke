<?php

namespace Database\Seeders;

use App\Models\ProductImportDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductImportDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductImportDetail::create([
            "id_product" => 1,
            "cost_price" => 10000,
            "quantity" => 15,
            "supplier_id" => 1,
            "import_id" => 1,
        ]);
        ProductImportDetail::create([
            "id_product" => 2,
            "cost_price" => 50000,

            "quantity" => 16,
            "supplier_id" => 1,
            "import_id" => 1,
        ]);
        ProductImportDetail::create([
            "id_product" => 3,
            "cost_price" => 70000,

            "quantity" => 17,
            "supplier_id" => 1,
            "import_id" => 1,
        ]);
        ProductImportDetail::create([
            "id_product" => 3,
            "cost_price" => 70000,

            "quantity" => 17,
            "supplier_id" => 2,
            "import_id" => 2,
        ]);
        ProductImportDetail::create([
            "id_product" => 2,
            "cost_price" => 80000,
            "quantity" => 18,
            "supplier_id" => 2,
            "import_id" => 2,
        ]);


        ProductImportDetail::create([
            "id_product" => 2,
            "cost_price" => 22222,
            "quantity" => 17,
            "supplier_id" => 3,
            "import_id" => 3,
        ]);
        ProductImportDetail::create([
            "id_product" => 1,
            "cost_price" => 1111,
            "quantity" => 17,
            "supplier_id" => 3,
            "import_id" => 3,
        ]);
    }
}
