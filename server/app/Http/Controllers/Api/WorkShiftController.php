<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Carbon;
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
        $input_date_start = Carbon::createFromFormat('Y-m-d', $validateData['date_start']);
        $input_date_end = Carbon::createFromFormat('Y-m-d', $validateData['date_end']);
        $workshifts = $this->workshiftRes->getAllWorkShift();
        foreach ($workshifts as $workshift) {
            $date_start = Carbon::createFromFormat('Y-m-d', $workshift->date_start);
            $date_end = Carbon::createFromFormat('Y-m-d', $workshift->date_end);
            if ($input_date_start->between($date_start, $date_end)) {
                return $this->sentErrorResponse("Date start is already in other work-shift");
            }
            if ($input_date_end->between($date_start, $date_end)) {
                return $this->sentErrorResponse("Date end is already in other work-shift");
            }
        }
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
