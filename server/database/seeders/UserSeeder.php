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
            'image' => 'https://avatars.githubusercontent.com/u/45101901?v=4',
            'role_id' => 1
        ]);

        User::create([
            'first_name' => 'Hoàng',
            'last_name' => 'Gia Bảo',
            'email' => 'musicanime2501@gmail.com',
            'password' => '123456',
            'image' => 'https://avatars.githubusercontent.com/u/120194990?v=4',
            'role_id' => 2
        ]);
    }
}