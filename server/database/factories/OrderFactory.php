<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class OrderFactory extends Factory
{
    protected $model = Order::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'total_price' => $this->faker->randomFloat(5,1),
            'status' => $this->faker->randomElement(['A', 'D']),
            'staff_id' => $this->faker->numberBetween(1,10),
            'checkout_time' => $this->faker->dateTimeBetween('now', '+1 year'),
            'customer_id' => $this->faker->numberBetween(1,15),
        ];
    }
}
