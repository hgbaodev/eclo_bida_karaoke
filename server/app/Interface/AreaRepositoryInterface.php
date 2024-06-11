<?php

namespace App\Interface;

interface AreaRepositoryInterface
{
  public function getAreas($request);
  public function getAreaById($id);
  public function createArea(array $data);
  public function updateAreaById($id, array $data);
  public function deleteAreaById($id);
  public function getAreaByActive($active);
}
