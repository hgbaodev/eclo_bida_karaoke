<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     * 
     *
     * @return array<string, mixed>
     */
    protected $model = Product::class;
    public function definition(): array
    {
        return [
            "name" => $this->faker->text(['Sting', 'C2', 'Olong', '7Up', 'Warrior', 'Aquafina', '247']),
            'description' => $this->faker->sentence,
            "cost_price" => $this->faker->randomFloat(2, 1, 1000),
            "selling_price" => $this->faker->randomFloat(2, 1, 1000),
            'unit' => $this->faker->randomElement(['kg', 'g', 'lb', 'oz']),
            'quantity' => $this->faker->numberBetween(1, 1000),
            'active' => base64_encode($this->faker->unique()->word),
        ];
    }
}
