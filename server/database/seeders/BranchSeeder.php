<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Branch::create([
            'name' => 'Chi nhánh A1',
            'company_id' => "1"
        ]);
        Branch::create([
            'name' => 'Chi nhánh A2',
            'company_id' => "1"
        ]);
        Branch::create([
            'name' => 'Chi nhánh B1',
            'company_id' => "2"
        ]);
        Branch::create([
            'name' => 'Chi nhánh B2',
            'company_id' => "2"
        ]);
    }
}
