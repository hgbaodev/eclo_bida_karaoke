<?php

namespace App\Http\Controllers;

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
        return $this->sentSuccessResponse($this->shiftRepository->getAllShift());
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
        if(!$this->shiftRepository->getShiftById($id))
        {
            return $this->sentErrorResponse('Shift' .$id. ' is not found',"error",404);
        }
        return $this->sentSuccessResponse($this->shiftRepository->getShiftById($id));
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
        if(!$this->shiftRepository->getShiftById($id))
        {
            return $this->sentErrorResponse('Shift' .$id. ' is not found',"error",404);
        }
        return $this->sentSuccessResponse($this->shiftRepository->deleteShiftById($id),"Shift is deleted successfully",200);
    }
}
