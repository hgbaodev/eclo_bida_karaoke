<?php

namespace Database\Factories;

use App\Models\ServiceDeviceDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceDeviceDetail>
 */
class ServiceDeviceDetailFactory extends Factory
{
    protected $model = ServiceDeviceDetail::class;

    public function definition(): array
    {
        return [
            'service_id' => $this->faker->numberBetween(1, 4),
            'device_id' => $this->faker->numberBetween(1, 4),
            'quantity' => $this->faker->numberBetween(1, 6),
        ];
    }
}
