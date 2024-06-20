<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WorkShift\WorkShiftRequest;
use App\Interface\WorkShiftRepositoryInterface;
use Illuminate\Http\Request;

class WorkShiftController extends Controller
{
    protected $workshiftRes;
    public function __construct(WorkShiftRepositoryInterface $workShiftRepositoryInterface)
    {
        $this->workshiftRes = $workShiftRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->sentSuccessResponse($this->workshiftRes->getAllWorkShift());
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
    public function store(WorkShiftRequest $request)
    {
        $validateData = $request->validated();
        return $this->sentSuccessResponse($this->workshiftRes->createWorkShift($validateData));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $active)
    {
        $workshift = $this->workshiftRes->getWorkShiftByActive($active);
        if (!$workshift) {
            return $this->sentErrorResponse("Work Shift is not found", "error", 404);
        }
        return $this->sentSuccessResponse($workshift);
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
    public function destroy(string $id)
    {
        //
    }
}
