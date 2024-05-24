<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Position\PositionRequest;
use App\Interface\PositionRepositoryInterface;
use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    protected $positionRepository;
    public function __construct(PositionRepositoryInterface $positionRepositoryInterface)
    {
        $this->positionRepository = $positionRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->positionRepository->getPositions($request));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PositionRequest $positionRequest)
    {
        $validatedData = $positionRequest->validated();
        return $this->sentSuccessResponse($this->positionRepository->createPosition($validatedData), 'Position is created successfully', 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($active)
    {
        return $this->sentSuccessResponse($this->positionRepository->getPositionByActive($active));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Position $position)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PositionRequest $request, $active)
    {
        $validatedData = $request->validated();
        if (!$this->positionRepository->getPositionByActive($active)) {
            return $this->sentErrorResponse('Position is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->positionRepository->updatePositionByActive($active, $validatedData), "Position is update successfully", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($active)
    {
        if (!$this->positionRepository->getPositionByActive($active)) {
            return $this->sentErrorResponse('Position is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->positionRepository->deletePositionByActive($active), "Position is deteled successfully", 200);
    }
}
