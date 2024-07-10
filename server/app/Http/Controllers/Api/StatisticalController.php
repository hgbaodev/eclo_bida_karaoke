<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Statistical\RevenueExRequest;
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

  public function getRevenueEx(RevenueExRequest $request)
  {
    $validated = $request->validated();
    $result = $this->statisticalRepository->getStatisticalRevenueEx($validated);
    return $this->sentSuccessResponse($result, 'Get statistical revenue ex successfully', 200);
  }
}
