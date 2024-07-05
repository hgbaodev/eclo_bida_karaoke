<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

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

        $names = ['Sting', 'C2', 'Olong', '7Up', 'Không độ', 'Mì tôm', 'Cơm chiên', 'Chuối chiên'];


        $name = $this->getUniqueName($names);

        return [
            "name" => $name,
            'id_type' => $this->faker->randomElement([1, 2]),
        ];
    }
    protected function getUniqueName(array $names): string
    {
        static $usedNames = [];

        // Loại bỏ các tên đã được sử dụng
        $availableNames = array_diff($names, $usedNames);

        // Nếu không còn tên nào để sử dụng
        if (empty($availableNames)) {
            throw new \Exception('No more unique names available.');
        }

        // Chọn một tên ngẫu nhiên từ các tên còn lại
        $name = Arr::random($availableNames);

        // Thêm tên vào danh sách đã sử dụng
        $usedNames[] = $name;

        return $name;
    }
}
