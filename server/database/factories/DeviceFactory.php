<?php

namespace Database\Factories;

use App\Models\Device;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Device>
 */
class DeviceFactory extends Factory
{
    protected $model = Device::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $deviceNames = [
            'Smartphone',
            'Laptop',
            'Tablet',
            'Smartwatch',
            'Desktop Computer',
            'Router',
            'Printer',
            'Scanner',
            'Webcam',
            'Monitor'
        ];

        return [
            'name' => $this->faker->unique()->randomElement($deviceNames),
            'description' => $this->faker->text(10),
            'status' => $this->faker->randomElement(['A', 'D'])
        ];
    }
}