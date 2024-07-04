<?php

namespace Database\Factories;

use App\Models\DayOffs;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DayOffs>
 */
class DayOffsFactory extends Factory
{
    protected $model = DayOffs::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $reason = [
            'bị bệnh',
            'té xe',
            'nhà có tiệc',
            'có giỗ',
            'sốt',
        ];
        // $reason = array_filter($reason, fn ($value) => !is_null($value) && $value !== '');

        $type = $this->faker->randomElement(['A', 'D']);
        return [
            'staff_id' => $this->faker->randomElement(['1', '2', '3']),
            'day_off' => $this->faker->dateTimeThisYear->format('Y-m-d'),
            'reason' => $type === 'A' ? $this->faker->randomElement($reason) : null,
            'type' => $type
        ];
    }
}
