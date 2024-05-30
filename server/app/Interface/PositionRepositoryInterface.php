<?php

namespace App\Interface;


interface PositionRepositoryInterface
{
    public function getPositions($request);
    public function getAllPositions();
    public function getPositionByActive($active);
    public function createPosition(array $data);
    public function updatePositionByActive($active, array $data);
    public function deletePositionByActive($active);
}
