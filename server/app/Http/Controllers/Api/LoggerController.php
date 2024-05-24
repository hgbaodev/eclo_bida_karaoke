<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interface\LoggerRepositoryInterface;
use Illuminate\Http\Request;

class LoggerController extends Controller
{
    protected $loggerRepository;

    public function __construct(LoggerRepositoryInterface $loggerRepository)
    {
        $this->loggerRepository = $loggerRepository;
    }

    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->loggerRepository->getLoggers($request));
    }
}