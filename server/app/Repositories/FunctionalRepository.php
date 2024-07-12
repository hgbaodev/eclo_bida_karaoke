<?php

namespace App\Repositories;

use App\Interface\FunctionalRepositoryInterface;
use App\Models\Functional;

class FunctionalRepository implements FunctionalRepositoryInterface
{

  public function getFunctionals($request)
  {
    $functionals = Functional::all();
    $result = [];
    foreach ($functionals as $functional) {
      $result[] = [
        'label' => ucwords($functional->name),
        'value' => ucwords($functional->name),
      ];
    }
    return $result;
  }
}
