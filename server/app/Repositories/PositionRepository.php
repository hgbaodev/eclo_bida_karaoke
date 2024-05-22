<?php

namespace App\Repositories;

use App\Interface\PositionRepositoryInterface;
use App\Models\Position;

class PositionRepository implements PositionRepositoryInterface{
    public function getAllPositions()
    {
        return Position::all();
    }
    public function getPositionById($id)
    {
        return Position::find($id);
    }
    public function createPosition(array $data)
    {
        return Position::create($data);
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
