<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'first_name' => 'Trần',
            'last_name' => 'Nhật Sinh',
            'email' => 'transinh085@gmail.com',
            'password' => '123456',
            'role' => 1
        ]);

        User::create([
            'first_name' => 'Hoàng',
            'last_name' => 'Gia Bảo',
            'email' => 'musicanime2501@gmail.com',
            'password' => '123456',
            'role' => 2
        ]);
    }
}
