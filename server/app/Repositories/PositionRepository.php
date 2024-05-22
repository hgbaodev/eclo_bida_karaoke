<?php

namespace App\Repositories;

use App\Interface\PositionRepositoryInterface;
use App\Models\Position;

class PositionRepository implements PositionRepositoryInterface{
    public function getAllPosition()
    {
        Position::all();
    }
    public function getPositionById($id)
    {
        Position::find($id);
    }
    public function createPosition(array $data)
    {
        Position::create($data);
    }
    public function updatePositionById($id, array $data)
    {
        $position = Position::find($id);
        $position->update($data);
        return $position;
    }
    public function deletePositionById($id)
    {
        $position = Position::find($id);
        $position->delete();
        return $position;
    }
}
