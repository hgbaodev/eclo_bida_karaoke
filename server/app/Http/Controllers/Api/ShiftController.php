<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

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
    public function index()
    {
        return $this->sentSuccessResponse($this->shiftRepository->getAllShifts());
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
    public function store(Request $request)
    {
        $validatedData = $request->validated();
        return $this->sentSuccessResponse($this->shiftRepository->createShift($validatedData));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (!$this->shiftRepository->getShiftByActive($id)) {
            return $this->sentErrorResponse('Shift' . $id . ' is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->shiftRepository->getShiftByActive($id));
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
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validated();
        if (!$this->shiftRepository->getShiftByActive($id)) {
            return $this->sentErrorResponse('Shift ' . $id . ' is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->shiftRepository->updateShiftByActive($id, $validatedData), "Shift is updated successfully", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!$this->shiftRepository->getShiftByActive($id)) {
            return $this->sentErrorResponse('Shift' . $id . ' is not found', "error", 404);
        }
        return $this->sentSuccessResponse($this->shiftRepository->deleteShiftByActive($id), "Shift is deleted successfully", 200);
    }
}
