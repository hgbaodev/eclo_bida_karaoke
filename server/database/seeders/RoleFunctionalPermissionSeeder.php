<?php

namespace Database\Seeders;

use App\Enums\PermissionEnum;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleFunctionalPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $functionalNames = [
            'user',
            'customer',
            'logger',
            'import',
            'product',
            'kitchenorder',
            'supplier',
            'shiftdetail',
            'schedule',
            'dayoff',
            'attendance',
            'shifts',
            'position',
            'salary',
            'staff',
            'role',
            'device',
            'table&room',
            'servicetype',
            'price',
            'statistical',
            'revenue'
        ];

        $permissions = [
            PermissionEnum::VIEW,
            PermissionEnum::CREATE,
            PermissionEnum::UPDATE,
            PermissionEnum::DELETE
        ];

        $functionalIds = DB::table('functionals')->whereIn('name', $functionalNames)->pluck('id', 'name');

        $data = [];
        foreach ($functionalNames as $functionalName) {
            foreach ($permissions as $permission) {
                $data[] = [
                    'role_id' => 1,
                    'functional_id' => $functionalIds[$functionalName],
                    'permission_id' => $permission
                ];
            }
        }

        DB::table('role_functional_permissions')->insert($data);
    }
}
