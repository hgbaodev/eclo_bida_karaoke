<?php

namespace App\Interface;

interface ServiceRepositoryInterface
{
  public function getServices($request);
  public function getServiceById($id);
  public function createService(array $data);
  public function updateServiceById($id, array $data);
  public function deleteServiceById($id);
  public function getServiceByActive($active);
}