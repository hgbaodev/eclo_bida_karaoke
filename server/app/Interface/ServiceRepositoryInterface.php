<?php

namespace App\Interface;

interface ServiceRepositoryInterface
{
  public function getServices($request);
  public function getServiceById($id);
  public function createService(array $data);
  public function updateServiceById(array $data, $id);
  public function deleteServiceById($id);
  public function getServiceByActive($active);
  public function changeStatus(array $data, $id);
}
