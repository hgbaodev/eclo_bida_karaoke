<?php

namespace Database\Factories;


use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
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
        return [
            "total_cost" => $this->faker->randomFloat(2, 1, 1000),
            "create_time" => $this->faker->dateTimeThisYear('now'),
            "receive_time" => $this->faker->dateTimeBetween('now', '+1 year'),
            "status" => $this->faker->randomElement(['A', 'D']),
        ];
    }
}
