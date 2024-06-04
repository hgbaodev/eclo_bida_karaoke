<?php

namespace Database\Factories;

use App\Models\Price;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Price>
 */
class PriceFactory extends Factory
{
    protected $model = Price::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'pricePerHour' => $this->faker->randomFloat(9,1),
            'status' => $this->faker->randomElement(['A', 'D']),
        ];
    }
}
