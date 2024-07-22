<?php

namespace Database\Factories;


use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceType>

 */
class ProductImportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = strtotime('2024-01-01');
        $endDate = strtotime('2024-12-31');

        // Tạo timestamp ngẫu nhiên trong khoảng thời gian đã định nghĩa
        $randomTimestamp = rand($startDate, $endDate);

        // Chuyển đổi timestamp ngẫu nhiên thành định dạng ngày
        $randomDate = date('Y-m-d H:i:s', $randomTimestamp);
        return [

            "user_id" => $this->faker->randomElement(['1', '2', '3']),

            "import_day" => $randomDate,
        ];
    }
}
