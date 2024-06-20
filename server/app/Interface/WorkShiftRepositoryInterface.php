<?php

namespace App\Interface;

interface WorkShiftRepositoryInterface
{
    public function getAllWorkShift();
    public function getWorkShiftByActive($active);
    public function createWorkShift(array $data);
}
