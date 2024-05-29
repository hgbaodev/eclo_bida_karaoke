<?php

namespace App\Repositories;

use App\Http\Collections\CollectionCustom;
use App\Interface\LoggerRepositoryInterface;
use App\Models\Logger;

class LoggerRepository implements LoggerRepositoryInterface
{
  public function getLoggers($request)
  {
    $query = $request->input('query');
    $perPage = $request->input('perPage');
    $all = $request->input('all');
    $loggers = Logger::query()->with(['user.role'])->orderBy('created_at', 'desc');
    if ($query) {
      $loggers->where("id", "LIKE", "%$query%")
        ->orWhere("action", "LIKE", "%$query%")
        ->orWhere("functional", "LIKE", "%$query%");
    }
    if ($all && $all == true) {
      $loggers = $loggers::with(['user.role'])->orderBy('created_at', 'desc')->get();
    } else {
      $loggers = $loggers->paginate($perPage ?? 10);
    }
    return new CollectionCustom($loggers);
  }
}
