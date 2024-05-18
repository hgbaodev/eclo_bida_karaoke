<?php

namespace App\Repositories;


use App\Interface\AreaRepositoryInterface;
use App\Models\Area;

class AreaRepository implements AreaRepositoryInterface {

    function getAllAreas()
    {
        return Area::all();
    }

    function getAreaById($id)
    {
        return Area::find($id);
    }

    function createArea(array $data)
    {
        return Area::create($data);
    }

    function updateAreaById($id, array $data)
    {
        $area = Area::find($id);
        $area->update($data);
        return $area;
    }

    function deleteAreaById($id)
    {
        $area = Area::find($id);
        $area->delete();
        return $area;
    }
}
