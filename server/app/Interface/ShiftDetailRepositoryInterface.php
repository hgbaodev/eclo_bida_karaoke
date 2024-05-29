<?php

namespace App\Interface;


interface ShiftDetailRepositoryInterface
{
    public function getShiftDetails($request);
    public function getAllShiftDetail();
    public function getShiftDetailByActive($active);
    public function createShiftDetail(array $data);
    public function updateShiftDetailByActive($active, array $data);
    public function deleteShiftDetailByActive($active);
}
