<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Branch>
 */
class BranchFactory extends Factory
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
            "phone" => $this->faker->phoneNumber,
            "address" => $this->faker->address,
            "email" => $this->faker->email,
            "company_id" => $this->faker->randomNumber(1, 10)
        ];
    }
}
