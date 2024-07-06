<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interface\StatisticalRepositoryInterface;
use Illuminate\Http\Request;

class StatisticalController extends Controller
{

  protected $statisticalRepository;

  public function __construct(StatisticalRepositoryInterface $statisticalRepository)
  {
    $this->statisticalRepository = $statisticalRepository;
  }

  public function getOverview()
  {
    $result = $this->statisticalRepository->getStatisticalOverView();
    return $this->sentSuccessResponse($result, 'Get statistical overview successfully', 200);
  }

  public function getTime(Request $request)
  {
    $result = $this->statisticalRepository->getStatisticalTime($request);
    return $this->sentSuccessResponse($result, 'Get statistical time successfully', 200);
  }
}
