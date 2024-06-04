<?php
namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\PriceRepositoryInterface;
use App\Models\Price;
class PriceRepository implements PriceRepositoryInterface
{
    /**
     * @param $request
     * @return mixed
     */
    public function getPrices($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');

        $prices = Price::query();
        $prices->latest();

        if($all){
            $prices = $prices->get();
        } else {
            $prices = $prices->paginate($perPage);
        }
        return new CollectionCustom($prices);
    }

    /**
     * @param $active
     * @return mixed
     */
    public function getPriceByActive($active)
    {
        return Price::where('active', $active)->firstOrFail();
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function createPrice(array $data)
    {
        return Price::create($data);
    }

    /**
     * @param $active
     * @param array $data
     * @return mixed
     */
    public function updatePriceByActive($active, array $data)
    {
        $price = Price::where('active', $active)->firstOrFail();
        $price->update($data);
        return $price;
    }

    /**
     * @param $active
     * @return mixed
     */
    public function deletePriceByActive($active)
    {
        $price = Price::where('active', $active)->firstOrFail();
        $price->delete($active);
        return $price;
    }
}
