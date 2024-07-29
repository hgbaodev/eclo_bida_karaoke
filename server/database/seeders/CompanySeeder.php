<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::create([
            'name' => 'Công ty A',
        ]);
        Company::create([
            'name' => 'Công ty B',
        ]);
        Company::create([
            'name' => 'Công ty C',
        ]);
        Company::create([
            'name' => 'Công ty D',
        ]);
    }
}
