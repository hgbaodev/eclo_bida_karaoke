<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as FakerFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Company::class;
    public function definition(): array
    {
        // Tạo instance của Faker với locale 'vi_VN'
        $faker = FakerFactory::create('vi_VN');

        return [
            'company_name' => $faker->company, // Sử dụng tên công ty thay vì tên người
            'email' => $faker->unique()->safeEmail,
            'address' => $faker->address,
            'phone_number' => $faker->phoneNumber,
        ];
    }
}