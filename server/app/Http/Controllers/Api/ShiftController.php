<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Shift\ShiftRequest;
use App\Interface\ShiftRepositoryInterface;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    protected $shiftRepository;
    public function __construct(ShiftRepositoryInterface $shiftRepositoryInterface)
    {
        $this->shiftRepository = $shiftRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->shiftRepository->getShifts($request));
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
    public function store(ShiftRequest $request)
    {
        $validatedData = $request->validated();
        return $this->sentSuccessResponse($this->shiftRepository->createShift($validatedData));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $active)
    {
        if (!$this->shiftRepository->getShiftByActive($active)) {
            return $this->sentErrorResponse('Shift is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->shiftRepository->getShiftByActive($active));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ShiftRequest $request, string $active)
    {
        $validatedData = $request->validated();
        if (!$this->shiftRepository->getShiftByActive($active)) {
            return $this->sentErrorResponse('Shift is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->shiftRepository->updateShiftByActive($active, $validatedData), "Shift is updated successfully", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $active)
    {
        if (!$this->shiftRepository->getShiftByActive($active)) {
            return $this->sentErrorResponse('Shift is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->shiftRepository->deleteShiftByActive($active), "Shift is deleted successfully", 200);
    }
}
