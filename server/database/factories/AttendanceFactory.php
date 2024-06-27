<?php

namespace Database\Factories;

use App\Models\Attendance;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Attendance::class;

    public function definition(): array
    {
        // Tạo một ngày ngẫu nhiên trong khoảng từ 1 năm trước đến 1 năm sau
        $day = Carbon::instance($this->faker->dateTimeBetween('-1 year', '+1 year'))->startOfDay();

        // Tạo một thời điểm ngẫu nhiên cho "time in" trong khoảng từ 9:00 đến 14:00
        $timeIn = Carbon::instance($this->faker->dateTimeBetween($day->copy()->addHours(9), $day->copy()->addHours(14)));

        // Tạo một thời điểm ngẫu nhiên cho "time out" trong khoảng từ 15:00 hôm nay đến 4:00 ngày mai
        $timeOut = $this->faker->boolean
            ? Carbon::instance($this->faker->dateTimeBetween($day->copy()->addHours(15), $day->copy()->endOfDay()))
            : Carbon::instance($this->faker->dateTimeBetween($day->copy()->addDay()->startOfDay(), $day->copy()->addDay()->addHours(4)));

        return [
            'staff_id' => $this->faker->randomElement([1, 2]),
            'time_in' => $timeIn,
            'time_out' => $timeOut,
            'day' => $day,
        ];
    }
}
