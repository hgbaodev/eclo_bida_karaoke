<?php 

namespace App\Interface;


interface PositionRepositoryInterface {
    public function getAllPositions();
    public function getPositionById($id);
    public function createPosition(array $data);
    public function updatePositionById($id,array $data);
    public function deletePositionById($id);

}