<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Staff>
 */
class StaffFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => $this->faker->name,
            "birthday" => $this->faker->date(),
            "image" => $this->faker->imageUrl,
            "phone" => $this->faker->phoneNumber,
            "idcard" => $this->faker->creditCardNumber(),
            "address" => $this->faker->address,
            "status" => $this->faker->randomElement(['A', 'D']),
            "position_id" => $this->faker->numberBetween(1, 4),
            "user_id" => $this->faker->unique()->uuid()
        ];
    }
}
