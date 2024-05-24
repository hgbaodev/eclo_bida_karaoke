<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\PositionRepositoryInterface;
use App\Models\Position;

class PositionRepository implements PositionRepositoryInterface
{
    public function getPositions($request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $name = $request->input('name');
        $salary = $request->input('salary');
        $position = Position::query();
        if ($query) {
            $position->where("name", "LIKE", "%$query%")->orWhere("salary", "LIKE", "%$query%");
        }
        if ($name) {
            $position->where("name", "LIKE", "%$name%");
        }
        if ($salary) {
            $position->where("salary", $salary);
        }
        if ($all && $all == true) {
            $position = $position->get();
        } else {
            $position = $position->paginate($perPage);
        }
        return new CollectionCustom($position);
    }
    public function getAllPositions()
    {
        return Position::all();
    }
    public function getPositionByActive($active)
    {
        return Position::where("active", $active)->get();
    }
    public function createPosition(array $data)
    {
        return Position::create($data);
    }
    public function updatePositionByActive($active, array $data)
    {
        $position = Position::where("active", $active)->get();
        $position->update($data);
        return $position;
    }
    public function deletePositionByActive($active)
    {
        $position = Position::where("active", $active)->get();
        $position->delete();
        return $position;
    }
}
