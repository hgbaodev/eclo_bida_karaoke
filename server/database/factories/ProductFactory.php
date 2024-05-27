<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [

            "name" => $this->faker->randomElement(['Sting', 'C2', 'Olong', '7Up', 'thuốc']),
            'description' => $this->faker->sentence,
            "cost_price" => $this->faker->randomFloat(2, 1, 1000),
            "selling_price" => $this->faker->randomFloat(2, 1, 1000),
            'unit' => $this->faker->randomElement(['kg', 'g', 'lb', 'oz']),
            'quantity' => $this->faker->numberBetween(1, 1000),
            'active' => base64_encode($this->faker->unique()->word),
        ];
    }
}