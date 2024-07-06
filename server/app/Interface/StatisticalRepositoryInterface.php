<?php

namespace App\Interface;

interface StatisticalRepositoryInterface
{
  public function getStatisticalOverView();
  public function getStatisticalTime($request);
}
