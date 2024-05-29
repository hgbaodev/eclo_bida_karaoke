<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interface\ShiftDetailRepositoryInterface;
use Illuminate\Http\Request;

class ShiftDetailController extends Controller
{
    protected $shiftDetailRespository;
    public function __construct(ShiftDetailRepositoryInterface $shiftDetailRepositoryInterface)
    {
        $this->shiftDetailRespository = $shiftDetailRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->sentSuccessResponse($this->shiftDetailRespository->getAllShiftDetail());
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
    public function update(Request $request, string $id)
    {
        //
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
