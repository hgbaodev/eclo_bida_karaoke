<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShiftDetail\ShiftDetailRequest;
use App\Interface\ShiftDetailRepositoryInterface;
use App\Interface\ShiftRepositoryInterface;
use Illuminate\Http\Request;

class ShiftDetailController extends Controller
{
    protected $shiftDetailRespository;
    protected $shiftRepositiory;
    public function __construct(ShiftDetailRepositoryInterface $shiftDetailRepositoryInterface, ShiftRepositoryInterface $shiftRepositoryInterface)
    {
        $this->shiftDetailRespository = $shiftDetailRepositoryInterface;
        $this->shiftRepositiory = $shiftRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->shiftDetailRespository->getShiftDetails($request));
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
    public function store(ShiftDetailRequest $request)
    {
        $validateData = $request->validated();
        $shift = $this->shiftRepositiory->getShiftByActive($validateData["shift_id"]);
        if (!$shift) {
            return $this->sentErrorResponse("Shift is not found", "error", 404);
        }
        $validateData["shift_id"] = $shift->id;
        return $this->sentSuccessResponse($this->shiftDetailRespository->createShiftDetail($validateData), 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(ShiftDetailRequest $request, string $active)
    {
        $validateData = $request->validated();
        $shift = $this->shiftRepositiory->getShiftByActive($validateData["shift"]);
        $shiftDetail = $this->shiftDetailRespository->getShiftDetailByActive($active);
        if (!$shiftDetail) {
            return $this->sentErrorResponse("Shift Detail is not found", "error", 404);
        }
        if (!$shift) {
            return $this->sentErrorResponse("Shift is not found", "error", 404);
        }
        $validateData["shift_id"] = $shift->id;
        unset($validateData["shift"]);
        return $this->sentSuccessResponse($this->shiftDetailRespository->updateShiftDetailByActive($active, $validateData), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $active)
    {
        if (!$this->shiftDetailRespository->getShiftDetailByActive($active)) {
            return $this->sentErrorResponse("Shift detail is not found", "error", 404);
        }
        return $this->sentSuccessResponse($this->shiftDetailRespository->deleteShiftDetailByActive($active), "Delete successfully", 200);
    }
}
