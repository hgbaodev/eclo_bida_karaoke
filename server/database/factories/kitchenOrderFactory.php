<?php

namespace Database\Factories;

use App\Models\KitchenOrder;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\kitchenOrder>
 */
class kitchenOrderFactory extends Factory
{
    protected $model = KitchenOrder::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => $this->faker->numberBetween(1, 4),
            'product_id' => $this->faker->numberBetween(1, 6),
            'quantity' => $this->faker->numberBetween(1, 20),
        ];
    }
}
