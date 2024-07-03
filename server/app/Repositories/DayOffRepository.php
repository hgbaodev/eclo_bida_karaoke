<?php

namespace App\Repositories;

use App\Interface\DayOffRepositoryInterface;
use App\Http\Collections\CollectionCustom;
use App\Models\DayOffs;
use App\Models\ProductImportDetail;
use Database\Factories\OffDayFactory;
use Illuminate\Support\Facades\DB;

class DayOffRepository implements DayOffRepositoryInterface
{
    public function getDayOffs($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $offday = DayOffs::query()->with(['staff_dayoff']);
        if ($query) {
            $offday->whereRaw("name LIKE '%$query%'");
        }
        if ($id) {
            $offday->where('id', $id);
        }

        if ($all && $all == true) {
            $offdays = $offday->get();
        } else {
            $offdays = $offday->paginate($perPage);
        }
        return new CollectionCustom($offdays);
    }
    public function getAllDayOff()
    {
        return DayOffs::all();
    }
    public function create(array $data)
    {
        return DayOffs::create($data);
    }
    public function getDayOffByActive($active)
    {
        return DayOffs::where("active", $active)->first();
    }
    public function updateDayOffByActive($active, array $data)
    {
        $offday = DayOffs::where("active", $active)->first();
        $offday->update($data);
        return $offday;
    }
    public function deleteByActive($active)
    {
        $offday = DayOffs::where("active", $active)->first();
        $offday->delete();
        return $offday;
    }
}
