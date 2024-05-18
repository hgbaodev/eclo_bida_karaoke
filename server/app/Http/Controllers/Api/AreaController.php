<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Area\StoreAreaRequest;
use App\Http\Requests\Area\UpdateAreaRequest;
use App\Interface\AreaRepositoryInterface;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    protected $areaRepository;

    public function __construct(AreaRepositoryInterface $areaRepository)
    {
        $this->areaRepository = $areaRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->sentSuccessResponse($this->areaRepository->getAllAreas());
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
    public function store(StoreAreaRequest $request)
    {
        $validated_data = $request->validated();
        return $this->sentSuccessResponse($this->areaRepository->createArea($validated_data), 'The area has been created', 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->sentSuccessResponse($this->areaRepository->getAreaById($id));
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
    public function update(UpdateAreaRequest $request,$id)
    {
        $validated_data = $request->validated();
        if (!$this->areaRepository->getAreaById($id)){
            return $this->sentErrorResponse('Area '.$id. ' is not found');
        }
        return $this->sentSuccessResponse($this->areaRepository->updateAreaById($id, $validated_data), 'The area '.$id.' has been updated!!!', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (!$this->areaRepository->getAreaById($id)){
            return $this->sentErrorResponse('Area '.$id. ' is not found');
        }
        return $this->sentSuccessResponse($this->areaRepository->deleteAreaById($id), 'The area '.$id.' has been deleted!!!', 200);
    }
}
