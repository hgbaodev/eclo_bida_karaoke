<?php

namespace App\Repositories;

use App\Interface\LoggerRepositoryInterface;
use App\Models\Logger;

class LoggerRepository implements LoggerRepositoryInterface
{
  function getLoggers($request)
  {
    $loggers = Logger::with(['user'])->get();
    return $loggers;
  }
}