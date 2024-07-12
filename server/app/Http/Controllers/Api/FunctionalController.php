<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interface\FunctionalRepositoryInterface;
use Illuminate\Http\Request;

class FunctionalController extends Controller
{

    protected $functionalRepository;

    public function __construct(FunctionalRepositoryInterface $functionalRepository)
    {
        $this->functionalRepository = $functionalRepository;
    }

    function index(Request $request)
    {
        return $this->sentSuccessResponse($this->functionalRepository->getFunctionals($request));
    }
}
