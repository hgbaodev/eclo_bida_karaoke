<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interface\ShiftUserDetailRepositoryInterface;
use Illuminate\Http\Request;

class ShiftUserDetailController extends Controller
{
    protected $shiftUserDetailRes;
    public function __construct(ShiftUserDetailRepositoryInterface $shiftUserDetailRepositoryInterface)
    {
        $this->shiftUserDetailRes = $shiftUserDetailRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->sentSuccessResponse($this->shiftUserDetailRes->getAllShiftUserDetail());
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
        //
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
        $shiftUserDetail = $this->shiftUserDetailRes->getShiftUserDetailByActive($active);
        if (!$shiftUserDetail) {
            return $this->sentErrorResponse("Shift User Detail is not found", "error", 404);
        }
        return $this->sentSuccessResponse($shiftUserDetail, "Deleted successfully!", 200);
    }
}
