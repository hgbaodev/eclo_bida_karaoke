<?php

namespace App\Interface;


interface ShiftUserDetailRepositoryInterface
{
    public function getShiftUserDetail($request);
    public function getAllShiftUserDetail();
    public function getShiftUserDetailByActive($active);
    public function createShiftUserDetail(array $data);
    public function updateShiftUserDetailByActive($active, array $data);
    public function deleteShiftUserDetailByActive($active);
}
