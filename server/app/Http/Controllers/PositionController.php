<?php

namespace App\Http\Controllers;

use App\Http\Requests\PositionRequest;
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
    public function index()
    {
        return $this->sentSuccessResponse($this->positionRepository->getAllPositions());
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
    public function store(PositionRequest $request)
    {
        $validatedData = $request->validated();
        return $this->sentSuccessResponse($this->positionRepository->createPosition($validatedData),'Position is created successfully',200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->sentSuccessResponse($this->positionRepository->getPositionById($id));
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
    public function update(PositionRequest $request,$id)
    {
        $validatedData = $request->validated();
        if(!$this->positionRepository->getPositionById($id)){
            return $this->sentErrorResponse('Position ' . $id . ' is not found',"error",404);
        }
        return $this->sentSuccessResponse($this->positionRepository->updatePositionById($id,$validatedData),"Position is update successfully",200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if(!$this->positionRepository->getPositionById($id)){
            return $this->sentErrorResponse('Position '.$id.' is not found',"error",404);
        }
        return $this->sentSuccessResponse($this->positionRepository->deletePositionById($id),"Position is deteled successfully",200);
    }
}
